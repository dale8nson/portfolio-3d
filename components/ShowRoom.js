'use client'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader, extend, useFrame, useThree, useGraph, } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, PointerLockControls, useCubeTexture, useTexture, useKeyboardControls } from '@react-three/drei'

import { vec3 } from '/lib/utils'
import { motion } from 'framer-motion-3d'
import { HoverUI } from './HoverUI'
import { BoxCollider } from './BoxCollider'

extend([PerspectiveCamera])

export const ShowRoom = ({ children }) => {

  const { scene, camera } = useThree()
  console.log('camera: ', camera)
  const colliderRef = useRef(null)
  const controlsRef = useRef(null)

  const wp = useMemo(() => new THREE.Vector3(), [])
  const wd = useMemo(() => new THREE.Vector3(), [])

  camera.getWorldPosition(wp)
  camera.getWorldDirection(wd)

  const rc = useMemo(() => new THREE.Raycaster(wp, wd, 0, 0.1), [])

  console.log(`rc: `, rc)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  const canvasRef = useRef(null)
  const cameraRef = useRef(null)

  const GLTF = useGLTF('/modern_themed_show_room_updated/scene.gltf')
  console.log('GLTF: ', GLTF)
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

  const speed = 2

  useEffect(() => {
    if (!controlsRef.current) return
    console.log('controlsRef.current: ', controlsRef.current)
  })

  useFrame((_, delta) => {
    if (!camera || !rc) return

    const ds = speed * delta

    camera.getWorldDirection(wd)
    camera.getWorldPosition(wp)

    const rayOrigin = wp.clone()
    rayOrigin.y = 0.3

    const rayDirection = wd.clone()

    rc.set(rayOrigin, rayDirection)

    // let objects = rc.intersectObject(colliderRef.current)
    let objects = rc.intersectObjects(scene.children)

    if (objects.length) console.log('objects: ', objects)
    const menu = objects.find(child => child.object.name === 'menu')
    if (menu) {
      controlsRef.current.unlock()
    }

    if (forwardPressed && !objects.some(child => child.distance < 0.1)) {

      // camera.position.x += wd.x * ds
      // camera.position.z += wd.z * ds
      // camera.position.x += pos.x * ds
      // camera.position.z += pos.z * ds
      controlsRef.current.moveForward(ds)

    }
    const backDirection = rayDirection.clone()
    backDirection.multiplyScalar(-1)
    rc.set(rayOrigin, backDirection)
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)

    if (backPressed && !objects.some(child => child.distance < 0.1)) {

      // camera.position.x += wd.x * ds
      // camera.position.z += wd.z * ds
      // camera.position.x += pos.x * ds
      // camera.position.z += pos.z * ds
      controlsRef.current.moveForward(-ds)

    }

    const leftDirection = new THREE.Vector3().crossVectors(rayDirection, vec3(0, 1, 0))
    rayOrigin.x -= 0.2
    rc.set(rayOrigin, leftDirection)
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)


    if (leftPressed && !objects.some(child => child.distance < 0.1)) {

      // camera.translateX(-ds)
      controlsRef.current.moveRight(-ds)
    }

    const rightDirection = new THREE.Vector3().crossVectors(backDirection, vec3(0, 1, 0))
    rayOrigin.x += 0.4
    rc.set(rayOrigin, rightDirection)
    // objects = rc.intersectObject(colliderRef.current)
    objects = rc.intersectObjects(scene.children)

    if (rightPressed && !objects.length) {

      // camera.translateX(ds)
      controlsRef.current.moveRight(ds)
    }

    // objectPositionRef.current = camera.position
  })

  return (
    <>
      <hemisphereLight />
      <PerspectiveCamera makeDefault position={vec3(0, 0.75, 5)} ref={cameraRef} />
      <BoxCollider ref={colliderRef} scale={vec3(6.75, 3, 6)} position={vec3(0, 1.5, 2.5)} />
      <HoverUI name='menu' position={vec3(0, 2, 4.3)} scale={0.25} initial={{ y: 0.8 }} animate={{ y: 0.775 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} >
        {children}
      </HoverUI>
      <motion.primitive initial={{ rotateY: 0 }} animate={{ rotateY: 2 * Math.PI }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} object={nebula.scene} scale={vec3(0.04, 0.04, 0.04)} position={vec3(0, 0, 0)} rotation={new THREE.Euler(0, 0, 0)} />
      <motion.primitive object={GLTF.scene} scale={.008} position={vec3(0, 0, 3)} rotation={new THREE.Euler(0, 0, 0)} />
      <PointerLockControls ref={controlsRef} />
    </>
  )
}