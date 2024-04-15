import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Canvas, useLoader, extend, useFrame, useThree, useGraph, } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls, CameraControls, useCubeTexture, useFBX, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { vec3 } from '/lib/utils'
import { motion } from 'framer-motion-3d'
import { HoverUI } from './HoverUI'
import { BoxCollider } from './BoxCollider'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, CameraControls])

export const ShowRoom2 = ({debug, children }) => {

  const { scene, camera } = useThree()
  console.log('camera: ', camera)
  const colliderRef = useRef(null)
  const controlsRef = useRef(null)
  const lines = useRef([])

  const head = useGLTF('/head_planes_reference/scene.gltf')
  head.scene.overrideMaterial = true
  console.log(`head.scene: `, head.scene)

  const wp = useMemo(() => new THREE.Vector3(), [])
  const wd = useMemo(() => new THREE.Vector3(), [])

  camera.getWorldPosition(wp)
  camera.getWorldDirection(wd)

  const rc = useMemo(() => new THREE.Raycaster(wp, wd, 0, 0.8), [])

  console.log(`rc: `, rc)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  const headOBJ = useLoader(OBJLoader, '/uploads_files_3268159_model+S1.obj')
  const { nodes: headNodes, materials: headMaterials } = useGraph(headOBJ)
  console.log('headNodes: ', headNodes)
  // for (const child of head.children) {
  // child.material.wireframe = true
  // child.material.color = 0xee0000
  // child.material.side = THREE.DoubleSide
  // }
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

  useEffect(() => {
    if (!controlsRef.current) return
    console.log('controlsRef.current: ', controlsRef.current)
  })


  useFrame((_, delta) => {
    if (!camera || !rc) return

    lines.current = []

    const ds = speed * delta

    camera.getWorldDirection(wd)

    camera.getWorldPosition(wp)
    const rayOrigin = wp.clone()
    rayOrigin.y = 0.6

    const rayDirection = wd.clone()

    rc.set(rayOrigin, rayDirection)

    lines.current.push(new Float32Array([...rayOrigin.toArray(), ...rayOrigin.add(rayDirection).addScalar(0.1).toArray()]))

    // let objects = rc.intersectObject(colliderRef.current)
    let objects = rc.intersectObjects(scene.children)


    if (objects.length) console.log('objects: ', objects)
    const menu = objects.find(child => child.object.name === 'menu')
    if (menu) {
      controlsRef.current.unlock()
    }

    if (forwardPressed && !objects.some(child => child.distance < 0.1)) {

      camera.position.x += wd.x * ds
      camera.position.z += wd.z * ds

    }
    const backDirection = rayDirection.clone()
    backDirection.z *= -1
    backDirection.x *= -1
    rc.set(rayOrigin, backDirection)
    // lines.current.push(new Float32Array([...rayOrigin.toArray(), ...rayOrigin.add(backDirection).addScalar(0.1).toArray()]))
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)


    if (backPressed && !objects.some(child => child.distance < 0.1)) {

      camera.position.x += wd.x * ds
      camera.position.z += wd.z * ds

    }

    const leftDirection = new THREE.Vector3().crossVectors(rayDirection, vec3(0, 1, 0))
    rayOrigin.x -= 0.2
    rc.set(rayOrigin, leftDirection)
    // lines.current.push(new Float32Array([...rayOrigin.toArray(), ...rayOrigin.add(leftDirection).addScalar(0.1).toArray()]))
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)


    if (leftPressed && !objects.some(child => child.distance < 0.1)) {

      camera.translateX(-ds)
    }

    const rightDirection = new THREE.Vector3().crossVectors(backDirection, vec3(0, 1, 0))
    rayOrigin.x += 0.4
    rc.set(rayOrigin, rightDirection)
    // lines.current.push(new Float32Array([...rayOrigin.toArray(), ...rayOrigin.add(rightDirection).addScalar(0.1).toArray()]))
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)

    if (rightPressed && !objects.some(child => child.distance < 0.1)) {

      camera.translateX(ds)
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.75, 5]} ref={cameraRef} />
      <hemisphereLight />
      {debug && lines.current.length && (
        <>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={lines.current[0]} itemSize={2} />
            </bufferGeometry>
            <lineBasicMaterial color={0xee0000} />
          </line>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={lines.current[1]} itemSize={2} />
            </bufferGeometry>
            <lineBasicMaterial color={0xee0000} />
          </line>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={lines.current[2]} itemSize={2} />
            </bufferGeometry>
            <lineBasicMaterial color={0xee0000} />
          </line>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={lines.current[3]} itemSize={2} />
            </bufferGeometry>
            <lineBasicMaterial color={0xee0000} />
          </line>
        </>
      )}
      {/* <primitive object={head.scene} material={<meshPhongMaterial color={0xee0000} emissive={0xee0000} />} position={vec3(0,1,2)}  scale={3} /> */}
      <BoxCollider ref={colliderRef} scale={vec3(6.75, 3, 6)} position={vec3(0, 1.5, 2.5)} />
      <HoverUI name='menu' position={vec3(0, 2, 2)} scale={.25} initial={{ y: 0.8 }} animate={{ y: 0.775 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} opacity={0} >
        {children}
      </HoverUI>
      <motion.primitive initial={{ rotateY: 0 }} animate={{ rotateY: 2 * Math.PI }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} object={nebula.scene} scale={0.02} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <motion.primitive object={GLTF.scene} scale={0.008} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <PointerLockControls ref={controlsRef} />
    </>
  )
}