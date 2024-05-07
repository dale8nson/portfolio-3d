'use client'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'


export const DrawingRoom = () => {

  const room = useGLTF('/the_great_drawing_room/scene.gltf')

  return (
    <primitive object={room.scene} position={[-1.2, -1, 3]} scale={[.5, .5, .5]} rotation={new THREE.Euler(0, -Math.PI / 1.4, 0)} />
  )
}