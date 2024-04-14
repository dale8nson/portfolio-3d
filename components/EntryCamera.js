'use client'
import { useRef, useEffect, forwardRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const EntryCamera = forwardRef(function EntryCamera(props, ref) {

  const camMixer = useRef(null)
  const camActionRef = useRef(null)

  const router = useRouter()

  useEffect(() => {
    if(!ref.current) return
    camMixer.current = new THREE.AnimationMixer(ref.current)
    const camTrack = new THREE.NumberKeyframeTrack('.position[z]', [0,1, 5], [10,10, -2])
    const camClip = new THREE.AnimationClip('', 5, [camTrack])
    camActionRef.current = camMixer.current.clipAction(camClip)
    camActionRef.current.setLoop(THREE.LoopOnce)
    camActionRef.current.clampWhenFinished = true

    camMixer.current.addEventListener('finished', () => router.push('/home'))
    

    ref.current.play = () => camActionRef.current.play()
  })

  useFrame((_, delta) => {
    if(camMixer.current) camMixer.current.update(delta)
  })

  return (
    <PerspectiveCamera makeDefault {...{...props}} ref={ref} />
  )
})