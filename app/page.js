'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { Html } from '@react-three/drei'
import { vec3 } from '@/lib/utils'

export default function Home() {

  useEffect(() => {
    if(!canvasRef.current) return
    const { innerWidth, innerHeight } = window
    canvasRef.current.setAttribute('width', innerWidth)
    canvasRef.current.setAttribute('height', innerHeight)


  })

  const canvasRef = useRef(null)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Canvas ref={canvasRef}>
        <ambientLight color={0xffffff} />
        <mesh className='main' position={vec3(-3.5, 0, 0)} scale={vec3(.1, .1, 1)}>
          <planeGeometry args={[16, 10]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>
        <Html wrapperClass='main'>
          <div className='flex-col align-middle text-white'>
            <h1>WELCOME</h1>
          </div>
        </Html>
      </Canvas>
     </main>
  );
}
