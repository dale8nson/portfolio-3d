'use client'
import { useRef, useEffect, forwardRef } from 'react'
import * as THREE from 'three'
import { vec3 } from '/lib/utils'


export const BoxCollider = forwardRef(function BoxCollider({ name = "", scale = vec3(1, 1, 1), position = vec3(0, 0, 0), rotation = new THREE.Euler(0, 0, 0), debug=false }, ref) {

  return (
    <mesh ref={ref} {...{ name, position, scale, rotation, }} >
      <boxGeometry args={[1, 1, 1, 10, 10]} />
      <meshBasicMaterial color={0xee0000} side={THREE.DoubleSide} wireframe transparent opacity={debug ? 1 : 0} />
    </mesh>
  )
})