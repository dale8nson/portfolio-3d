'use client'
import Link from 'next/link'
import { Button } from '/components/ui/button'
export default function Layout({ children }) {

  return (
    <div className='h-screen w-screen flex-col align-middle mx-auto'>
      <div className='flex mx-auto' >
        <Button><Link href='/data/form'>FORM</Link></Button>
        <Button><Link href='/data/graph'>GRAPH</Link></Button>
      </div>
      {children}
    </div>
  )
}