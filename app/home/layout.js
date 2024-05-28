'use client'
// import { useMemo, useRef, useEffect } from 'react'

// import { extend } from '@react-three/fiber'
import {  useFBX } from '@react-three/drei'
// extend([KeyboardControls])

// import { RouterProvider } from '/components/RouterProvider'

// useFBX.preload('/resume/resume3.fbx')

export default function Layout({ children }) {


  // const map = useMemo(() => [
  //   { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  //   { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  //   { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  //   { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  //   { name: 'jump', keys: ['Space'] },
  // ], [])


  return (
    // <KeyboardControls map={map}>
      <div className='h-screen w-screen absolute top-0 left-0'>
        {/* <RouterProvider> */}
            {children}
        {/* </RouterProvider> */}
      </div>
    // </KeyboardControls>
  )
}