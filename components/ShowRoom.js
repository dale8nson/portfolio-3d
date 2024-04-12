import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls, CameraControls, useCubeTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { vec3 } from '/lib/utils'
import { motion } from 'framer-motion-3d'
import { CubeUI } from './CubeUI'
import { BoxCollider } from './BoxCollider'

extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, CameraControls])

export const ShowRoom = () => {

  const { scene, camera } = useThree()
  console.log('camera: ', camera)
  const colliderRef = useRef(null)

  const wp = useMemo(() => new THREE.Vector3(), [])
  const wd = useMemo(() => new THREE.Vector3(), [])

  camera.getWorldPosition(wp)
  camera.getWorldDirection(wd)

  const rc = useMemo(() => new THREE.Raycaster(wp, wd, 0, 0.2), [])

  console.log(`rc: `, rc)

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

  const speed = 2

  useFrame((_, delta) => {
    if (!camera || !rc) return

    const ds = speed * delta

    camera.getWorldDirection(wd)

    camera.getWorldPosition(wp)
    const rayOrigin = wp.clone()
    rayOrigin.y = 0.3

    const rayDirection = wd.clone()

    rc.set(rayOrigin, rayDirection)

    let objects = rc.intersectObject(colliderRef.current)

    if (objects.length) console.log('objects: ', objects)

    if (forwardPressed && !objects.length) {

      camera.position.x += wd.x * ds
      camera.position.z += wd.z * ds

    }
    const backDirection = rayDirection.clone()
    backDirection.multiplyScalar(-1)
    rc.set(rayOrigin, backDirection )
    objects = rc.intersectObject(colliderRef.current)

    if (backPressed && !objects.length) {

      camera.position.x += wd.x * ds
      camera.position.z += wd.z * ds

    }

    const leftDirection = new THREE.Vector3().crossVectors(rayDirection, vec3(0,1,0))
    rayOrigin.x -= 0.2
    rc.set(rayOrigin, leftDirection)
    objects = rc.intersectObject(colliderRef.current)

    if (leftPressed && !objects.length) {

      camera.translateX(-ds)
    }

    const rightDirection = new THREE.Vector3().crossVectors(backDirection, vec3(0,1,0))
    rayOrigin.x += 0.4
    rc.set(rayOrigin, rightDirection)
    objects = rc.intersectObject(colliderRef.current)


    if (rightPressed && !objects.length) {

      camera.translateX(ds)
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
      <BoxCollider ref={colliderRef} scale={vec3(6.75, 3, 6)} position={vec3(0, 1.5, 2.5)} /> 
      <CubeUI />
      <motion.primitive initial={{ rotateY: 0 }} animate={{ rotateY: 2 * Math.PI }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} object={nebula.scene} scale={0.02} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <motion.primitive object={GLTF.scene} scale={0.008} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <PointerLockControls />
    </>
  )
}