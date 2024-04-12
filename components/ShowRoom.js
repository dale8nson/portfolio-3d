import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useThree } from 'three'
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls, CameraControls, useCubeTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { vec3 } from '/lib/utils'
import { motion } from 'framer-motion-3d'
import { CubeUI } from './CubeUI'

extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, CameraControls])

export const ShowRoom = () => {

  const canvasRef = useRef(null)
  const cameraRef = useRef(null)
  const objectPositionRef = useRef(vec3(0, 0, 0))

  const GLTF = useGLTF('/modern_themed_show_room_updated/scene.gltf')
  const nebula = useGLTF('/free_-_skybox_space_nebula/scene.gltf')
  const cube = useGLTF('/uxrzone__basic_pointcloud_cube/scene.gltf')

  const forwardPressed = useKeyboardControls(state => state.forward)
  const backPressed = useKeyboardControls(state => state.back)
  const leftPressed = useKeyboardControls(state => state.left)
  const rightPressed = useKeyboardControls(state => state.right)
  const jumpPressed = useKeyboardControls(state => state.jump)


  const cubeMap = useCubeTexture(['px.png', 'nx.png', 'ny.png', 'py.png', 'pz.png', 'nz.png'], { path: '/Standard-Cube-Map/' })
  cubeMap.wrapS = cubeMap.wrapT = THREE.RepeatWrapping
  cubeMap.mapping = THREE.CubeRefractionMapping
  cubeMap.flipY = true

  console.log('cubeMap: ', cubeMap)

  const speed = 1.5

  useFrame((_, delta) => {
    if (!cameraRef.current) return

    const ds = speed * delta
    const wd = new THREE.Vector3()
    cameraRef.current.getWorldDirection(wd)

    if (forwardPressed) {

      cameraRef.current.position.x += wd.x * ds
      cameraRef.current.position.z += wd.z * ds

    }
    if (backPressed) {

      cameraRef.current.position.x -= wd.x * ds
      cameraRef.current.position.z -= wd.z * ds

    }
    if (leftPressed) {

      cameraRef.current.translateX(-ds)
    }

    if (rightPressed) {

      cameraRef.current.translateX(ds)
    }
  })


  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.75, 5]} ref={cameraRef} />
      <hemisphereLight />

      {/* {cubeMap && <mesh scale={vec3(20, 20, 20)} position={vec3(0, 0, 0)}>
        <sphereGeometry args={[20, 20, 20]} />
        <meshBasicMaterial envMap={cubeMap} side={THREE.DoubleSide} />
      </mesh>} */}
      <mesh scale={1.5}>
        <boxGeometry args={[1,1,1]} />
        <meshBasicMaterial wireframe />
      </mesh>
      <CubeUI />
      <motion.primitive initial={{rotateY:0}} animate={{rotateY:2 * Math.PI}} transition={{duration: 50, repeat: Infinity, ease:'linear'}} object={nebula.scene} scale={0.02} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <motion.primitive object={GLTF.scene} scale={0.008} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <PointerLockControls />
    </>
  )
}