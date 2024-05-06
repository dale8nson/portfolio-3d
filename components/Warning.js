'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { useFrame } from '@react-three/fiber'
import { useFBX, useGLTF } from '@react-three/drei'


export const Warning = ({envMap, animRefs, position}) => {

  const warning = useFBX('/warning.fbx')
  console.log('warning: ', warning)
  warning.children[0].material.side = THREE.DoubleSide

  const warningRef = useRef(null)
  const warningMixer = useRef()
  const warningActions = useRef([])

  useEffect(() => {
    if(!warningRef.current) return
    warningMixer.current = new THREE.AnimationMixer(warningRef.current)
    console.log('warningRef.current: ', warningRef.current)
    for (const [index, anim] of Object.entries(warningRef.current.animations)) {
      warningActions.current.push(warningMixer.current.clipAction(anim))
    }

    animRefs.current = warningActions.current

  },[])

  // useEffect(() => {
  //   if(isPlaying) {
  //     for(const anim of warningActions.current) {
  //       anim.reset().play()
  //     }
      
  //   }
  // }, [isPlaying])


  useFrame((_, delta) => {
    if(warningMixer.current) warningMixer.current.update(delta)
  }) 

  return (
    <group position={position}>
      <primitive object={warning} position={[0, 0, 2.95]} scale={0.008} rotation={new THREE.Euler(0, 0, 0)} envMap={envMap} ref={warningRef} />
      <pointLight position={[-0.3, 0, 4]} color={0xFF6800} intensity={.3} decay={2} />
      <pointLight position={[0.3, 0, 4]} color={0xFF6800} intensity={.3} decay={2} />
    </group>
  )

}