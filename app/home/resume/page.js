'use client'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { useFBX } from '@react-three/drei'
import { HomeButton } from '/components/HomeButton'
import { Resume } from '/components/Resume'

useFBX.preload('/resume/resume3.fbx')

export default function Page() {
  const router = useRouter()
  const onClick = () => router.push('/home')
  const canvasRef = useRef(null)
  const pointerOverRef = useRef(null)
  const pointerOutRef = useRef(null)
  const [onPointerOut, setOnPointerOut] = useState(null)
  const [onPointerOver, setOnPointerOver] = useState(null)

  useEffect(() => {

    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`
  })

  return (
    <Canvas ref={canvasRef} className='h-screen w-screen'>
      <Resume setOnPointerOver={setOnPointerOver} setOnPointerOut={setOnPointerOut} />
      {/* <HomeButton onClick={onClick} onPointerOver={onPointerOver} position={[]} onPointerOut={onPointerOut} /> */}
    </Canvas>
  )
}