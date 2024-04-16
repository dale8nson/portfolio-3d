'use client'
import { Canvas, extend } from '@react-three/fiber'
import { Html } from '@react-three/drei'

extend([Html])

export default function Loading() {
  return (
    <Canvas>
    <group position={[-.5,-.5,0]} scale={.6}>
      <Html transform>
        <div className='w-screen h-screen' >
          <video src="/5680034-hd_1920_1080_24fps.mp4" muted autoPlay={true} playsInline={true} controls={false} loop={true} />
        </div>
      </Html>
    </group>
    </Canvas>
  )
}