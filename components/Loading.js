import { Suspense } from 'react'
import { Html } from '@react-three/drei'

export const Loading = ({ children, canvas }) => {
  return (
    <Suspense fallback={(
      <div className='w-screen h-screen absolute top-0 left-0 flex-col justify-items-center items-center bg-black'>
        <div className='w-1/2 h-1/2 flex-col justify-items-center items-center m-[25%]'>
          <h1 className='text-[#338833] text-3xl font-[retro] animate-pulse text-center '>PLEASE WAIT WHILE LOADING</h1>
          <h2 className='text-[#338833] text-xl font-[retro] animate-pulse text-center'><small>Or your computer will self-destruct</small></h2>
        </div>
      </div>
    )
    }>
      {children}
    </Suspense>
  )
}