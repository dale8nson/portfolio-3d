'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useFBX} from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export const Fence = ({ position, animRef }) => {

  // const fenceObj = useLoader(GLTFLoader, '/fence/fence.gltf')
  const fenceObj = useFBX('/fence/fences.fbx')
  console.log('fenceObj: ', fenceObj)
  const mixer = useRef()
  const action = useRef()
  const ref = useRef(null)

  useEffect(() => {
    if(!ref.current) return
    mixer.current = new THREE.AnimationMixer(ref.current)
    action.current = mixer.current.clipAction(ref.current.animations[0])
    action.current.clampWhenFinished = true
    action.current.setLoop(THREE.LoopOnce)
    animRef.current = action.current
  })

  useFrame((_, delta) => {
    if(mixer.current) mixer.current.update(delta)
  })

  return (
      <primitive object={fenceObj} scale={0.02} position={position} ref={ref} />
  )
}