'use client'
import { Canvas, useLoader, extend, useFrame, useThree, useGraph, } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { motion } from 'framer-motion-3d'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { Terminal } from '/components/Terminal'
import { useEffect, useRef, useMemo, useState } from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, useKeyboardControls, CameraControls, useCubeTexture, useTexture } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { vec3 } from '/lib/utils'
import * as THREE from 'three'
import Link from 'next/link'

import { BoxCollider } from './BoxCollider'
import { HoverUI } from './HoverUI'

// import { Button, buttonVariants } from '/components/ui/button'
import { GLButton2 } from '/components/GLButton2'
import { Cursor } from '/components/Cursor'
import { MainMenu } from '/components/MainMenu'

extend([OrbitControls, FirstPersonControls, PointerLockControls, PresentationControls, KeyboardControls, CameraControls])

export const ShowRoom = ({ debug, children }) => {

  const { scene, camera } = useThree()
  const router = useRouter()
  console.log('camera: ', camera)

  const [cursorType, setCursorType] = useState('default')
  const colliderRef = useRef(null)
  const controlsRef = useRef(null)
  const lines = useRef([])

  const wp = useMemo(() => new THREE.Vector3(), [])
  const wd = useMemo(() => new THREE.Vector3(), [])

  camera.getWorldPosition(wp)
  camera.getWorldDirection(wd)

  const rc = useMemo(() => new THREE.Raycaster(wp, wd, 0, 0.8), [])

  console.log(`rc: `, rc)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  const canvasRef = useRef(null)
  const cameraRef = useRef(null)
  const objectPositionRef = useRef(vec3(0, 0, 0))

  const GLTF = useGLTF('/modern_themed_show_room_updated/scene.gltf')
  const nebula = useGLTF('/free_-_skybox_space_nebula/scene.gltf')

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

  const onPointerOver = e => {
    e.stopPropagation()
    console.log('onPointerOver')
    setCursorType('pointer')
  }

  const onPointerOut = e => {
    e.stopPropagation()

    console.log('onPointerOut')
    setCursorType('default')
  }

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


    // if (objects.length) console.log('objects: ', objects)
    const menu = objects.find(child => child.object.name === 'menu' || child.object.name === 'terminal')
    if (menu) {
      controlsRef.current.unlock()
    }
    // else if (controlsRef.current.isLocked) controlsRef.current.lock()

    if (forwardPressed && !objects.some(child => child.distance < 0.1)) {

      camera.position.x += wd.x * ds
      camera.position.z += wd.z * ds

    }
    const backDirection = rayDirection.clone()
    backDirection.z *= -1
    backDirection.x *= -1
    backDirection.y *= -1
    rc.set(rayOrigin, backDirection)
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
      <motion.group position={[0, 0.8, 5]}>
        <PerspectiveCamera makeDefault ref={cameraRef} />
        {/* <Cursor distance={0.2} type={cursorType} /> */}
      </motion.group>
      <hemisphereLight />
      <BoxCollider ref={colliderRef} scale={vec3(6.75, 3, 6)} position={vec3(0, 1.5, 2.5)} />
      {/* <HoverUI name='menu' position={vec3(0, -.5, 3.5)} scale={.5} initial={{ y: 0.6 }} animate={{ y: 0.585 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} opacity={0} >
        {children}
      </HoverUI> */}
      <motion.group initial={{ y: 0.75 }} animate={{ y: 0.73 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}>
        <MainMenu onPointerOver={onPointerOver} onPointerOut={onPointerOut} />
      </motion.group>
      {/* <Terminal position={[1.2, 0.75, 2.68]} rotation={new THREE.Euler(0, Math.PI / 2, 0)}>
        <Text name='terminal' font='/nasalization-rg.otf' position={[0, 0.4, 0.6]} scale={0.08} color={0xff22ff} characters='DAVISULNTES'>
          DATA VISUALISATION
        </Text>
        <group name='terminal' onClick={() => router.push('/data')}>
          <Text font='/nasalization-rg.otf' position={[0, 0, 0.6]} scale={0.08} color={0xff00ff88} characters='VIST'>
            VISIT
          </Text>
          <motion.mesh initial={{ opacity: 0 }} whileHover={{ opacity: 0.7 }} position={[0, 0, 0.1]} scale={[0.4, 0.5, 4]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial transparent color={0x0000aa} opacity={0} />
          </motion.mesh>
        </group>
      </Terminal> */}
      <motion.primitive initial={{ rotateY: 0 }} animate={{ rotateY: 2 * Math.PI }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} object={nebula.scene} scale={0.02} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <motion.primitive object={GLTF.scene} scale={0.008} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <PointerLockControls ref={controlsRef} />
    </>
  )
}