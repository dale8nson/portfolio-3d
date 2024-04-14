'use client'
import { useMemo, useRef, useEffect, Suspense } from 'react'
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls, Html } from '@react-three/drei'
import { ShowRoom } from '/components/ShowRoom'

extend([ShowRoom])

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

  extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls])

  return (
    <KeyboardControls map={map}>
      <Suspense>
        <Canvas ref={canvasRef} className='h-screen'>
          {children}
        </Canvas>
      </Suspense>
    </KeyboardControls>
  )
}