'use client'
import { useRef, useEffect, Suspense, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useLoader, useThree } from '@react-three/fiber'
import { Text3D, useVideoTexture } from '@react-three/drei'
import { motion, MotionLayoutCamera, MotionCanvas } from 'framer-motion-3d'
import { GLButton } from '@/components/GLButton'
import { ParticleSystem } from '@/components/ParticleSystem'
import { World } from '@/components/World'
import { VideoBackdrop } from '@/components/VideoBackdrop'

import { vec3 } from '@/lib/utils'

extend({ Text3D, ParticleSystem })

export default function Home() {
  // const { camera } = useThree()
  // const [mainMenu, setMainMenu] = useState(null)

  const canvasRef = useRef(null)
  // const mainMenuRef = useRef(null)
  const cubeMapRef = useRef(null)
  const uiRef = useRef(null)


  let envMap, setEnvMap, worldMap, setWorldMap

  const [envMapState, setEnvMapState] = useState(null)
  // const [cubeMapTex] = useLoader(THREE.CubeTextureLoader, [['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']])
  // if (process.env.BUILD === 'production')
  envMap = envMapState
  // else envMap = cubeMapTex

  const [worldMapState, setWorldMapState] = useState(null)
  // const [worldMapTex] = useLoader(THREE.CubeTextureLoader, [['sh_rt copy.png', 'sh_lf copy.png', 'sh_up copy.png', 'sh_dn copy.png', 'sh_bk copy.png', 'sh_ft copy.png']])

  // if (process.env.BUILD === 'production') 
  worldMap = worldMapState
  // else worldMap = worldMapTex

  const initTextNode = node => {
    if (!node) return
    node.geometry.computeBoundingBox()
    node.geometry.center()
  }
  // const cubeMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], { path: '/' })

  useEffect(() => {

    if (!canvasRef.current) return
    if (typeof window !== 'undefined') {
      const { outerWidth, outerHeight } = window
      canvasRef.current.setAttribute('width', outerWidth)
      canvasRef.current.setAttribute('height', outerHeight)
    }

    // if (process.env.BUILD === 'production') { 
    setEnvMapState(new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']))
    // }

    setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['sh_rt copy.png', 'sh_lf copy.png', 'sh_up copy.png', 'sh_dn copy.png', 'sh_bk copy.png', 'sh_ft copy.png']))

    // cubeMapRef.current = new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'])

    // envMap.mapping = THREE.CubeReflectionMapping
    // worldMap.mapping = THREE.CubeRefractionMapping

  }, [])

  if (envMapState && worldMapState) {

    envMapState.mapping = THREE.CubeReflectionMapping
    worldMapState.mapping = THREE.CubeRefractionMapping
  }

  const centreNode = node => {
    node.geometry.computeBoundingBox()
    node.geometry.center()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black ">
      {/* <Suspense> */}
      <Canvas ref={canvasRef}>
        <hemisphereLight intensity={1} />
        {/* <World worldMap={worldMap} /> */}
        {/* <VideoBackdrop url='/riverclouds.mp4' /> */}
        {/* <ambientLight /> */}
        {envMap && <motion.mesh initial={{ x: -4, y: 5, z: 11, rotateY: 0, rotateX: -32 }} animate={{ x: -4, y: 2, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} style={{ transformOrigin: 'center' }} >
          <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
          <motion.pointLight initial={{ x: 0, y: 2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
          <Text3D position={vec3(3.75, 0.8, 0)} scale={vec3(0.5, 0.5, 1)} font='/Itai Protests_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.002} style={{ transformOrigin: 'center' }} ref={initTextNode} >
            WELCOME&nbsp;TO
            <meshPhongMaterial envMap={envMap} emissive={0xee6666} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} />
            <meshPhongMaterial envMap={envMap} emissive={0xee4444} attach='material-1' color={0xee4444} shininess={100} refractionRatio={1} />
          </Text3D>
        </motion.mesh>}
        {envMap && <motion.group initial={{ x: -1, y: 4, z: 5, rotateY: 13, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} animate={{ x: -1.25, y: 1, z: 0, rotateY: 0, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} transition={{ duration: 5 }} style={{ originX: 0.5, originY: 0.5, originZ: 0 }} >
          <Text3D position={vec3(1.2, 0, 0)} scale={vec3(0.4, 0.6, 1)} font='/Itai Protests_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: '50% 50%' }} ref={initTextNode} >
            DaleTristanHutchinson.com
            <motion.meshPhongMaterial envMap={envMap} emissive={0x444444} attach='material-0' color={0x444444} shininess={100} refractionRatio={1} />
            <motion.meshPhongMaterial envMap={envMap} emissive={0x44ee44} attach='material-1' color={0x44ee44} shininess={100} refractionRatio={1} />
            
            {/* <motion.pointsMaterial attach='material-1' color={0xee0000} size={0.0015} sizeAttenuation /> */}
          </Text3D>
        </motion.group>}
        <GLButton {...{ cubeMap: envMap }}>ENTER</GLButton>
        <motion.points position={vec3(0,1,0)} scale={vec3(6,6,6)} initial={{rotateY:6, scaleY:1}} animate={{rotateY:0, scaleY:-1}} transition={{duration:13, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0xff4444} size={0.02} sizeAttenuation wireframe />
        </motion.points>
        <motion.points position={vec3(0,1,0)} scale={vec3(6,6,6)} initial={{rotateY:-6, scaleX:1}} animate={{rotateY:0, scaleX:-1}} transition={{duration:23, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0x44ff44} size={0.02} sizeAttenuation wireframe />
        </motion.points>
        <motion.points position={vec3(0,1,0)} scale={vec3(6,6,6)} initial={{rotateY:-6, scaleZ:1}} animate={{rotateY:0, scaleZ:-1}} transition={{duration:19, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0x4444ff} size={0.02} sizeAttenuation wireframe />
        </motion.points>
        <ParticleSystem />
      </Canvas>
      {/* </Suspense> */}
    </main >
  )
}



