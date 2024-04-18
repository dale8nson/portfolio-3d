'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { z } from 'zod'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarIcon } from '@radix-ui/react-icons'

import { Calendar } from '@/components/ui/calendar'

import request, { gql } from 'graphql-request'

import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'


const dataForm = z.object({
  date: z.date(),
  population: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' }),
  vaccinated: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' }),
  unvaccinated: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' }),
  deaths: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' }),
  vaccinatedDeaths: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' }),
  unvaccinatedDeaths: z.coerce.number().int({ invalid_type_error: 'Number must be an integer.' }).nonnegative({ invalid_type_error: 'Number must be non-negative.' })
})

export const DataEntry2 = () => {

  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(dataForm),
    defaultValues: {
      date: new Date(),
      population: '',
      vaccinated: '',
      unvaccinated: '',
      deaths: '',
      vaccinatedDeaths: '',
      unvaccinatedDeaths: ''
    }
  })

  console.log('form: ', form)
  // eslint-disable-next-line quotes
  const query = gql`  
    query hello {
      hello
    }
  `

  // console.log('query: ', query)

  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => request('/api/graphql', query)
  })

  const addCaseQuery = gql`
    mutation addCase($case: CaseInput){
      addCase(case: $case) {
        date {
          day
          month
          year
        },
        population,
        vaccinated,
        unvaccinated,
        deaths,
        vaccinatedDeaths,
        unvaccinatedDeaths
      }
    }`



  const addCaseMutation = useMutation({
    mutationFn: async (data) => {
      console.log(`mutationFn data: `, data)
      const { date, population, vaccinated, unvaccinated, deaths, vaccinatedDeaths, unvaccinatedDeaths } = data
      const { day, month, year } = data.date

      const variables = {
        "date": {
          "day": day,
          "month": month,
          "year": year
        },
        "population": population,
        "vaccinated": vaccinated,
        "unvaccinated": unvaccinated,
        "deaths": deaths,
        "vaccinatedDeaths": vaccinatedDeaths,
        "unvaccinatedDeaths": unvaccinatedDeaths

      }

      return request('/api/graphql', addCaseQuery, { "case": variables })
    }
  })

  // console.log('graphql query data: ', data)

  function onSubmit(values) {

    console.log('values: ', values)
    const {date, population, vaccinated, unvaccinated, deaths, vaccinatedDeaths, unvaccinatedDeaths } = values
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()]

    const variables = {
      "case": {
        "date": {
          "day": day,
          "month": month,
          "year": year
        },
        "population": population,
        "vaccinated": vaccinated,
        "unvaccinated": unvaccinated,
        "deaths": deaths,
        "vaccinatedDeaths": vaccinatedDeaths,
        "unvaccinatedDeaths": unvaccinatedDeaths
      }
    }

    try {
      
      addCaseMutation.mutate(variables.case, { onError:e => console.log(`error mutating: ${e.message}`), onSuccess: (m) => {
        console.log(`success: `, m)
        queryClient.invalidateQueries(['cases'])
        form.reset()
      }})
     
    } catch (e) {
      console.log(`e: `, e)
    }

  }

  return (
    <div className='border-solid w-1/4 h-11/12 mx-0 border-black rounded-md border-2 p-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mr-4'>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='population'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Population</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <FormField
            control={form.control}
            name='vaccinated'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Vaccinated</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <FormField
            control={form.control}
            name='unvaccinated'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Unvaccinated</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <FormField
            control={form.control}
            name='deaths'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Deaths</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <FormField
            control={form.control}
            name='vaccinatedDeaths'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Vaccinated Deaths</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <FormField
            control={form.control}
            name='unvaccinatedDeaths'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Unvaccinated Deaths</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
          <Button type="submit">Add</Button>
        </form>
      </Form>
      {/* {addCaseMutation.isPending && <h1>Adding data...</h1>}
      {addCaseMutation.isSuccess && <h1 className='text-green-400'>Data added</h1>}
      {addCaseMutation.isError && <h1 className='text-red-500'>An error occurred while adding the data: {addCaseMutation.error.message}</h1>} */}
    </div>
  )
}