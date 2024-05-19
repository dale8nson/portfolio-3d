'use client'
import { useRef, useEffect } from 'react'

export default function Loading() {

  const ref = useRef(null)

  useEffect(() => {
    if(!ref.current) return
    ref.current.style.cursor = 'none'
  })

  return (
    <main className='w-screen h-screen absolute top-0 left-0 flex-col justify-items-center items-center bg-black' ref={ref} >
      <div className='w-1/2 h-1/2 flex-col justify-items-center items-center m-[25%]'>
        <h1 className='text-[#338833] text-3xl font-[retro] animate-pulse text-center '>PLEASE WAIT WHILE LOADING</h1>
        <h2 className='text-[#338833] text-xl font-[retro] animate-pulse text-center'><small>...or your computer will self-destruct</small></h2>
      </div>
    </main>
  )
}