'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { useFrame } from '@react-three/fiber'
import { useFBX, useGLTF, useCubeTexture } from '@react-three/drei'

export const Warning = ({ animRefs, position}) => {

  const warning = useGLTF('/warning.gltf')
  // console.log('warning: ', warning)
  for (const child of warning.scene.children) {
    if(child.isMesh)
      child.material.side = THREE.DoubleSide
  }
  // warning.children[0].material.side = THREE.DoubleSide

  const envMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], {path:'/'})

  const warningRef = useRef(null)
  const warningMixer = useRef()
  const warningActions = useRef([])

  useEffect(() => {
    if(!warningRef.current) return
    warningMixer.current = new THREE.AnimationMixer(warningRef.current)
    // console.log('warningRef.current: ', warningRef.current)
    for (const anim of warning.animations) {
      warningActions.current.push(warningMixer.current.clipAction(anim))
    }

    animRefs.current = warningActions.current

  },[])

  useFrame((_, delta) => {
    if(warningMixer.current) warningMixer.current.update(delta)
  }) 

  return (
    <group position={position}>
      <primitive object={warning.scene} position={[0, 0, 2.95]} scale={1} rotation={new THREE.Euler(0, 0, 0)} envMap={envMap} ref={warningRef} />
      <pointLight position={[-0.3, 0, 4]} color={0xFF6800} intensity={.3} decay={2} />
      <pointLight position={[0.3, 0, 4]} color={0xFF6800} intensity={.3} decay={2} />
    </group>
  )
}