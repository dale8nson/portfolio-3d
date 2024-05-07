'use client'
import Link from 'next/link'
import { Button } from '/components/ui/button'
export default function Layout({ children }) {

  return (
    <div className='h-screen w-screen flex-col align-middle mx-auto'>
      <div className='flex align-baseline' >
        <Button><Link href='/data/form'>FORM</Link></Button>
        <Button><Link href='/data/table'>TABLE</Link></Button>
        <Button><Link href='/home'>HOME</Link></Button>
      </div>
      <div className='flex text-white text-xl font-bold leading-2 my-4 justify-center mx-auto w-full'>
        <h1>Rates of COVID deaths among vaccinated and unvaccinated compared to vaccination rates in the NSW population</h1>
      </div>
      {children}
    </div >
  )
}
