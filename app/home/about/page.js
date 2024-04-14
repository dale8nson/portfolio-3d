'use client'
import * as THREE from 'three'
import { extend, useThree } from '@react-three/fiber'
import { Html, useGLTF, PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { ShowRoom } from '/components/ShowRoom'
import { vec3 } from '/lib/utils'

extend([Html, PerspectiveCamera])

export default function About() {

  const room = useGLTF('/the_great_drawing_room/scene.gltf')
  console.log('room: ', room)

  return (
    <group position={vec3(0,0,0)} scale={vec3(1,1,1)}>
    <PerspectiveCamera makedefault position={vec3(0,0,40)} rotation={new THREE.Euler(0, 0, 0)} />
    <hemisphereLight />
    <primitive object={room.scene} position={vec3(-1.2,-1,3)} scale={vec3(.5,.5,.5)} rotation={new THREE.Euler(0, -Math.PI / 1.4, 0)} />
    <Html>
      <div className='flex-col align-middle mx-auto my-0'>
        <h1 className='font-[led] text-[#338833]'>ABOUT</h1>
      </div>
    </Html>
    <PointerLockControls />
    </group>
  )
}