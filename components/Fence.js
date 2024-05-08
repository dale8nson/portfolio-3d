'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useFBX, useGLTF} from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export const Fence = ({ position, animRefs }) => {

  // const fenceObj = useLoader(GLTFLoader, '/fence/fence.gltf')
  const fenceObj = useGLTF('/fence/fence.glb')
  console.log('fenceObj: ', fenceObj)
  const mixer = useRef()
  const actions = useRef([])
  const ref = useRef(null)

  useEffect(() => {
    if(!ref.current) return
    mixer.current = new THREE.AnimationMixer(ref.current)
    for(const anim of ref.current.animations) {
      actions.current.push(mixer.current.clipAction(anim))
      // actions.current.clampWhenFinished = true
      anim.setLoop(THREE.LoopOnce)

    }

    animRefs.current = actions.current
  })

  useFrame((_, delta) => {
    if(mixer.current) mixer.current.update(delta)
  })

  return (
      <primitive object={fenceObj.scene} scale={1.7} position={position} ref={ref} />
  )
}