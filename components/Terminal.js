'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { Html, Edges, Text } from '@react-three/drei'

extend([Html, Edges, Text])

export const Terminal = ({ position, orientation, children, ...props }) => {

  const meshRef = useRef(null)
  const wd = useRef(new THREE.Vector3())
  const htmlRef = useRef(null)

  let eulerY
  switch (orientation) {
    case 'left':
      eulerY = -Math.PI / 2
      break;
    case 'right':
      eulerY = Math.PI / 2
      break;
    case 'back':
      eulerY = Math.PI
      break;
    default:
      eulerY = 0
  }

  useEffect(() => {
    // if (!meshRef.current || !htmlRef.current) return
    // meshRef.current.getWorldDirection(wd.current)

    // console.log('htmlRef.current: ', Object.fromEntries(Object.entries(htmlRef.current)))

    // const { x, y, width, height } = htmlRef.current.getBoundingClientRect()

    // const wrapper = document.querySelector('.wrapper')

    // wrapper.clientLeft = x
    // wrapper.clientTop = y
    // wrapper.clientWidth = width
    // wrapper.clientHeight = height

    // htmlRef.current.classList.add('')
  }, [])

  const scale = 0.3125
  const z = 5.3
  // const xRotation = -Math.PI / 6
  const xRotation = 0

  return (
    <group position={position} scale={[scale, scale / (16 / 9), scale * 0.125]} {...{ ...props }}>
      <mesh position={[0, 0, 0]} >
        <boxGeometry args={[1, 1]} />
        <meshPhongMaterial attach='material' color={0x0000cc} emissive={0x0000cc} transparent opacity={0.4} side={THREE.DoubleSide} shininess={120} />
        {children}
        <Edges color={0x0000aa} lineWidth={4} />
      </mesh>
    </group>
  )
}