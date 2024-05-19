import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
// import { Container, Root, Content } from '@react-three/uikit'
import { useFBX, useCubeTexture, Outlines, Html, useGLTF } from '@react-three/drei'
import { extend, useThree } from '@react-three/fiber'
// import { Button } from '/components/uikit/default/button'
import { motion } from 'framer-motion-3d'
import { animate, motionValue, useTransform } from 'framer-motion'
import { useStore } from '/lib/store'
import { RouterContext } from '/components/RouterContext'


extend([Outlines, Html])

export const HomeButton = ({ onClick, renderOrder, onPointerOver, onPointerOut, position }) => {
  // const { router } = useStore(state =>  state.router)
  // router.prefetch('/home')
  const { camera, gl, scene, get } = useThree()
  const { x, y, z } = camera.position
  console.log('scene: ', scene)
  const [cursorVisible, setCursorVisible] = useState(false)

  const intensity = motionValue(2)
  const roughness = motionValue(0.3)
  const cpx = motionValue(0)
  const cpy = motionValue(0)
  const cpz = motionValue(0)

  const cursor = useRef()

  const rootRef = useRef(null)

  const homeButton = useGLTF('/home-icon.glb')
  console.log('homeButton: ', homeButton)
  // const envMap = useCubeTexture(['sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png'], { path: '/' })

  const envMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], {path:'/'})
  envMap.anisotropy = 0
  envMap.wrapT = envMap.wrapS = THREE.RepeatWrapping
  envMap.mapping = THREE.CubeReflectionMapping
  const { material: mat } = homeButton.scene.children[0]
  mat.envMap = envMap
  mat.envMapIntensity = 1
  mat.refractionRatio = 0.5
  mat.emissive = new THREE.Color(16, 16, 0)
  // mat.color = new THREE.Color(16, 16, 0)

  mat.emissiveIntensity = 0.0000625
  // mat.specular = new THREE.Color(255, 227, 188)
  mat.specular = new THREE.Color(32, 32, 0)
  mat.reflectivity = 0.5
  mat.shininess = 100
  mat.side = THREE.DoubleSide

  // useEffect(() => {
  //   if (!point.current) return

  // }, [])


  const pointerOverHandler = e => {
    {
      console.log('pointer over: ', e)
      if (onPointerOver) onPointerOver(e)
    }
  }

  const pointerOutHandler = e => {
    animate(intensity, 2, { duration: 0.5 })
    if (onPointerOut) onPointerOut(e)
  }

  return (
    <>
      <motion.group position={position} renderOrder={50} onClick={onClick} onPointerOver={pointerOverHandler}
        onPointerOut={pointerOutHandler} scale={[.1425, 0.125075, .1]}>
        <motion.group whileHover={{ z: 0.125 }} position={[0, 0, 0]} transition={{ duration: 0.25 }}  >
          <motion.primitive object={homeButton.scene} whileHover={{ scaleZ: 4 }} position={[0, 0, 0]} envMap={envMap} 
            // children-0-material-wireframe
            children-0-material-envMapIntensity={1} children-0-material-color={0xFFE3BC}
            children-0-material-metalness={1}
            children-0-material-roughness={0.4}
            // rotation={new THREE.Euler(0.035, -Math.PI / 100 * 20, 0.23)} renderOrder={0}
            // rotation={new THREE.Euler(0,-Math.PI / 16 * 4.25, Math.PI / 40 * 4)} renderOrder={0}
            rotation={[0, 0, 0]} renderOrder={0}
          >
          </motion.primitive>
          <motion.directionalLight position={[-0.2, 0, -.1]} intensity={2} target={homeButton.scene} />
          <motion.directionalLight position={[-0.2, 0, .1]} intensity={intensity} target={homeButton.scene} />
        </motion.group>
      </motion.group>
    </>
  )
}