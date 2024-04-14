'use client'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { vec3 } from '/lib/utils'
import { motion } from 'framer-motion-3d'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import { ShowRoom } from '/components/ShowRoom'


extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls])

export default function Page() {
  // const GLTF = useGLTF('/modern_themed_show_room_updated/scene.gltf')
  // useLoader(GLTFLoader, '/modern_themed_show_room_updated/scene.gltf')
  // {scene, meshes, scenes, nodes, materials} 
  // console.log('nodes: ', nodes)
  // console.log('materials: ', materials)
  // console.log('scene: ', scene)
  // console.log('scenes: ', scenes)
  // console.log('meshes: ', meshes)
  // console.log('GLTF: ', GLTF)

  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`

  })

  return (
    <ShowRoom>
      <main>
        <div className='mx-auto align-items-middle p-1 w-5/12 text-xs rounded-sm border border-solid border-[#338833] max-h-full font-[led] flex-col align-middle text-[#338833] bg-[#336633] backdrop-blur-sm bg-opacity-50 leading-2'>
          <h1 className='text-center'>WELCOME</h1>
          <Button className='bg-transparent h-2 mx-auto my-0 p-2 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
            <Link href='/home/about'>About</Link>
          </Button>
          <Button className='bg-transparent h-2 p-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] align-items-center transition-color duration-500' >
            Resume
          </Button>
          <Button className='bg-transparent p-2 h-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
            Projects
          </Button>
          <Button className='bg-transparent p-2 h-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
            Contact
          </Button>
        </div>
      </main>
    </ShowRoom>
  )
}
