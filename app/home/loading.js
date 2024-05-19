'use client'
import { useRef, useEffect } from 'react'
import { extend } from '@react-three/fiber'
import { Html } from '@react-three/drei'

extend([Html])

export default function Loading() {

  const ref = useRef(null)

  useEffect(() => {
    if(!ref.current) return
    ref.current.style.cursor = 'none'
  })

  return (
    <div className='w-screen h-screen' ref={ref} >
      <video src="/5680034-hd_1920_1080_24fps.mp4" muted autoPlay={true} playsInline={true} controls={false} loop={true} />
    </div>

  )
}