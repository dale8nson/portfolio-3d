'use client'
import { DataEntry } from '@/components/DataEntry'
import { DataTable } from '@/components/DataTable'


export default function Page() {


  return (
    <main className='flex-col bg-black w-full h-screen my-8 mx-0'>
      <div className='flex-col w-11/12 h-[95vh]  mx-auto my-auto p-4 border-solid border-black bg-white border-2 rounded-md'>
        <div className='flex justify-around gap-4 align-middle'>
          <DataEntry />
          {/* <DataTable /> */}
        </div>
      </div>
    </main >
  )
}