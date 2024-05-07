'use client'
import { useMemo, useRef, useEffect } from 'react'

import { extend } from '@react-three/fiber'
import {  KeyboardControls } from '@react-three/drei'
extend([KeyboardControls])

import { RouterProvider } from '/components/RouterProvider'

export default function Layout({ children }) {

  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`

  })

  const map = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'back', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ], [])


  return (
    <KeyboardControls map={map}>
      <div className='h-screen w-screen absolute top-0 left-0'>
        <RouterProvider>
            {children}
        </RouterProvider>
      </div>
    </KeyboardControls>
  )
}