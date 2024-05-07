/* eslint-disable quotes */
'use client'

import { forwardRef, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { vec3 } from '../lib/utils'
import { BaseShaderComponent } from './BaseShaderComponent'


export const Fog = forwardRef(function Fog(props,ref) {
  // const ref = useRef(null)

  const map = useLoader(THREE.TextureLoader, '/Texturelabs_Atmosphere_133L.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  const geometry = <planeGeometry args={[1, 1]} />

  const uniforms = {
    map
  }

  console.log(`uniforms: `, uniforms)
  // useEffect(() => {
  //   if (!ref.current) return
  //   console.log('ref.current: ', ref.current)
  // }, [])

  return (
    <BaseShaderComponent geometry={geometry} uniforms={uniforms} position={vec3(0, 0, 1)} scale={vec3(10, 10, 10)} motionProps={{ initial: { x: 0 }, animate: { x: 0 }, transition: { duration: 10, repeatType: 'mirror', repeat: Infinity } }} ref={ref} />
  )
})
