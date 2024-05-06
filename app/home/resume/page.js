'use client'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { HomeButton } from '/Components/HomeButton'
import { Resume } from '/components/Resume'

export default function Page() {
  const router = useRouter()
  const onClick = () => router.push('/home')
  const canvasRef = useRef(null)

  useEffect(() => {

    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`

  })

  return (
    <Canvas ref={canvasRef} className='h-screen'>
      <Resume>
        <HomeButton onClick={onClick} />
      </Resume>
    </Canvas>
  )
}