// 'use client'
// import { useEffect, useRef, useMemo } from 'react'
// import * as THREE from 'three'
// import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber'
// import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls } from '@react-three/drei'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import { vec3 } from '/lib/utils'
// import { motion } from 'framer-motion-3d'

// import { ShowRoom } from '/components/ShowRoom'


// extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls])
// export default function Page() {
//   const GLTF = useGLTF('/modern_themed_show_room_updated/scene.gltf')
//   // useLoader(GLTFLoader, '/modern_themed_show_room_updated/scene.gltf')
//   // {scene, meshes, scenes, nodes, materials} 
//   // console.log('nodes: ', nodes)
//   // console.log('materials: ', materials)
//   // console.log('scene: ', scene)
//   // console.log('scenes: ', scenes)
//   // console.log('meshes: ', meshes)
//   console.log('GLTF: ', GLTF)

//   const canvasRef = useRef(null)

//   useEffect(() => {
//     if (!canvasRef.current) return
//     const { outerWidth, outerHeight } = window

//     canvasRef.current.style.width = `${outerWidth}px`
//     canvasRef.current.style.height = `${outerHeight}px`

//   })

//   return (
//     <div>
//       <Canvas ref={canvasRef} className='h-screen'>
//         <KeyboardControls map={map} >
//           <ShowRoom />
//         </KeyboardControls>
//         {/* <PointerLockControls /> */}
//       </Canvas>
//     </div>
//   )
// }