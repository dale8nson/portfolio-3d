'use client'
import { DataEntry } from '@/components/DataEntry'
import { DataTable } from '@/components/DataTable'


export default function Page() {


  return (
    <main className='flex-col bg-black w-full h-screen my-8 mx-0'>
      <div className='flex-col w-11/12 h-[95vh]  mx-auto my-auto p-4 border-solid border-black bg-white border-2 rounded-md'>
        <h1 className='text-xl my-4 font-bold text-center'>Rates of COVID deaths among vaccinated and unvaccinated compared to vaccination rates in the NSW population</h1>
        <div className='flex justify-around gap-4 align-middle'>
          <DataEntry />
          {/* <DataTable /> */}
        </div>
      </div>
    </main >
  )
}