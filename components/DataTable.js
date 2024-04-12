'use client'
import { Suspense, useRef } from 'react'
import { TableSkeleton } from './TableSkeleton'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useVirtualizer } from '@tanstack/react-virtual'

import request, { gql } from 'graphql-request'

import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'

export const DataTable = () => {

  const parentRef = useRef(null)
  const columns = [
    {
      accessorKey: 'recordId',
      header: 'id'
    },
    {
      accessorKey: 'date',
      header: 'Date'

    },
    {
      accessorKey: 'population',
      header: 'Population'
    },
    {
      accessorKey: 'vaccinated',
      header: 'Vaccinated'
    },
    {
      accessorKey: 'unvaccinated',
      header: 'Unvaccinated'
    },
    {
      accessorKey: 'deaths',
      header: 'Deaths'
    },
    {
      accessorKey: 'vaccinatedDeaths',
      header: 'Vaccinated Deaths'
    },
    {
      accessorKey: 'unvaccinatedDeaths',
      header: 'Unvaccinated Deaths'
    }
  ]

  const query = gql`
  query cases {
    cases {
      recordId
      date {
        day
        month
        year
      }
      population
      vaccinated
      unvaccinated
      deaths
      vaccinatedDeaths
      unvaccinatedDeaths
    }
  }`
  // console.log(' DataTable query: ', query)

  const { data, error, loading, isPending } = useQuery({
    queryKey: ['cases'],
    queryFn: async () => request('/api/graphql', query)
  })

  console.log('DataTable graphql query data: ', data?.cases)

  let cases
  let formattedCases = []
  if (data) {
    cases = data.cases
    //       .map(case => {
    //   return case
    // })

    for (let i = 0; i < cases.length; i++) {
      let { _id, recordId, date, population, vaccinated, unvaccinated, deaths, vaccinatedDeaths, unvaccinatedDeaths } = cases[i]

      const { day, month, year } = date
      date = new Date(year, month - 1, day).toLocaleDateString()

      formattedCases.push({ _id, recordId, date, population, vaccinated, unvaccinated, deaths, vaccinatedDeaths, unvaccinatedDeaths })

    }
  }

  const table = useReactTable({
    data: formattedCases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 20,
  })

  // console.log('table: ', table)
  // if (isPending) {
  //   return <TableSkeleton />

  // }

  // if (loading || !data) {
  //   return <div><h1 className='text-4xl text-black'>Loading...</h1></div>
  // }

  // if (error) {
  //   return <div className='h-screen flex justify-center mx-10 w-10/12 p-8 overflow-y-scroll flex-wrap text-wrap'><h1 className='text-2xl text-black'>Error loading data: {JSON.stringify(error.message)}</h1></div>
  // }

  // if(loading || isPending) return (
  //   <div className="rounded-md border-solid mx-2 z-10 w-3/4 h-10/12 border-black border-2 relative">
  //   <Table className='absolute left-0 top-0 h-[80vh] '>
  //     <TableHeader className='top-0'>
  //       {table.getHeaderGroups().map((headerGroup) => (
  //         <TableRow key={headerGroup.id}>
  //           {headerGroup.headers.map((header) => {
  //             return (
  //               <TableHead key={header.id}>
  //                 {header.isPlaceholder
  //                   ? null
  //                   : flexRender(
  //                     header.column.columnDef.header,
  //                     header.getContext()
  //                   )}
  //               </TableHead>
  //             )
  //           })}
  //         </TableRow>
  //       ))}
  //     </TableHeader>
  //     <TableBody className=' top-[50px] overflow-y-scroll h-[80vh]' >
  //     <TableSkeleton colSpan={columns.length} />
  //     </TableBody>
  //     </Table>
  //   </div >
  // )

  if (isPending) return <TableSkeleton />
  if (loading) return <TableSkeleton />

  return (
    <Table className='overflow-hidden'>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }} className=" relative z-0 rounded-md border-solid border-black border-2 ">
      <div ref={parentRef} className='h-[650px] relative z-0 overflow-scroll'>
        <TableHeader className='bg-white outline outline-2 outline-offset-[-1px] p-2 z-50 w-full h-20 sticky top-0 left-0' >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className=' sticky z-30'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className='relative outline-black outline border-2  bg-white z-30' key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className='relative'  >
          {
            table.getRowModel().rows?.length ?
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = table.getRowModel().rows[virtualRow.index]
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='relative'
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - index * virtualRow.size
                        }px)`
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='relative -z-10'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              }
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )
          }
        </TableBody>
      </div>
    </div>
      </Table >
    

  )
}
