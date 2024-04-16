'use client'
import { useMemo, useRef, useEffect, Suspense } from 'react'
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls } from '@react-three/drei'
import { ShowRoom } from '/components/ShowRoom'
import * as THREE from 'three'
import { vec3 } from '/lib/utils'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls])

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
        <Canvas ref={canvasRef} className='h-screen'>
          {children}
        </Canvas>
      </div>
    </KeyboardControls>
  )
}