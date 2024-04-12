'use client'
import { useRef, useEffect, Suspense, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useLoader, useThree } from '@react-three/fiber'
import { Text3D, useVideoTexture, PerspectiveCamera } from '@react-three/drei'
import { motion, MotionLayoutCamera, MotionCanvas } from 'framer-motion-3d'
import { GLButton } from '@/components/GLButton'
import { ParticleSystem } from '@/components/ParticleSystem'
import { World } from '@/components/World'
import { PixelBox } from '@/lib/shaders'
import { DoubleDoors } from '@/components/DoubleDoors'
import { VideoBackdrop } from '@/components/VideoBackdrop'
import { Fog } from '@/components/Fog'

import { vec3 } from '@/lib/utils'

extend({ Text3D, ParticleSystem })

export default function Home() {
  // const { camera } = useThree()
  // const [mainMenu, setMainMenu] = useState(null)
  console.log('new THREE.PlaneGeometry(1,1): ', new THREE.PlaneGeometry(1, 1))

  const canvasRef = useRef(null)
  // const mainMenuRef = useRef(null)
  const cubeMapRef = useRef(null)
  const uiRef = useRef(null)
  const pixelBoxRef = useRef(null)
  const doubleDoorRef = useRef(null)
  const fogRef = useRef(null)

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

    if (fogRef.current) console.log('fogRef.current: ', fogRef.current)

    if (!canvasRef.current) return
    console.log('canvasRef.current: ', canvasRef.current)

    console.log('pixelBoxRef.current: ', pixelBoxRef.current)
    if (typeof window !== 'undefined') {
      const { outerWidth, outerHeight } = window
      canvasRef.current.setAttribute('width', outerWidth)
      canvasRef.current.setAttribute('height', outerHeight)
    }

    setEnvMapState(new THREE.CubeTextureLoader().setPath('/').load(['dark_rt copy.png', 'dark_lf copy.png', 'dark_up copy.png', 'dark_dn copy.png', 'dark_bk copy.png', 'dark_ft copy.png']))

    // setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['dark_rt.png', 'dark_lf.png', 'dark_up.png', 'dark_dn.png', 'dark_bk.png', 'dark_ft.png']))

    setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png']))

    // setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['sun.png', 'sun.png', 'sun.png', 'sun.png', 'sun.png', 'sun.png']))

    // cubeMapRef.current = new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'])

    // envMap.mapping = THREE.CubeReflectionMapping
    // worldMap.mapping = THREE.CubeRefractionMapping

  }, [])

  if (envMapState && worldMapState) {

    envMapState.mapping = THREE.CubeReflectionMapping
    worldMapState.mapping = THREE.CubeRefractionMapping
  }

  const centreNode = node => {
    if (!node) return
    node.geometry.computeBoundingBox()
    node.geometry.center()
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-black '>
      {/* <Suspense> */}
      <Canvas ref={canvasRef} camera={{ manual: false }}>
        <hemisphereLight intensity={1} />
        {/* <World worldMap={worldMap} /> */}
        {/* <PixelBox ref={pixelBoxRef} cubeMap1={worldMap} color={vec3(0, 0, 0)} scale={vec3(200, 200, 200)} /> */}
        <motion.group initial={{ rotateY: -3 }} animate={{ rotateY: 3 }} transition={{ duration: 24, repeatType: 'mirror', repeat: Infinity }} >
          <Fog ref={node => fogRef.current = node} />
          <DoubleDoors color={0x000000} ref={doubleDoorRef} />
          <mesh position={vec3(0, 0, -6)} scale={vec3(6, 12.5, 1)} >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color={0xffffff} />
          </mesh>
          <PerspectiveCamera makeDefault position={vec3(0, 0, 10)} />
          {envMap && <motion.group style={{ transformOrigin: '50% 50%' }} >
            <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
            <motion.pointLight initial={{ x: 0, y: 2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
            <motion.group initial={{ x: 0, y: 5, z: 11, rotateY: 0, rotateY: -32 }} animate={{ x: 0, y: 2, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} style={{ transformOrigin: '50% 50%' }}>
              <Text3D position={vec3(0, 0.6, 0)} scale={vec3(0.75, 1, 1)} font='/Itai Protests_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: 'center' }} ref={initTextNode} >
                WELCOME TO
                <meshPhongMaterial envMap={envMap} emissive={0xeeee00} attach='material-0' color={0xeeee00} shininess={100} refractionRatio={1} />
                <meshPhongMaterial envMap={envMap} emissive={0xeeee00} attach='material-1' color={0xeeee00} shininess={100} refractionRatio={1} />
              </Text3D>
            </motion.group>
          </motion.group>}
          {envMap && <motion.group position={vec3(9, 0, 0)} initial={{ x: 0, y: 4, z: 5, rotateY: 13, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} animate={{ x: 0, y: 1, z: 0, rotateY: 0, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} transition={{ duration: 5 }} style={{ originX: 0.5, originY: 0.5, originZ: 0 }} >
            <Text3D position={vec3(0, 0, 0)} scale={vec3(0.4, 1.3, 1)} font='/Itai Protests_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: '50% 50%' }} ref={initTextNode} >
              DaleTri$tanHutchin$on.com
              <motion.meshPhongMaterial envMap={envMap} emissive={0xeeee00} attach='material-0' color={0xeeee00} shininess={100} refractionRatio={1} transparent opacity={1} />
              <motion.meshPhongMaterial envMap={envMap} emissive={0xeeee00} attach='material-1' color={0xeeee00} shininess={100} refractionRatio={1} transparent opacity={1} />
            </Text3D>
          </motion.group>}
          <GLButton {...{ cubeMap: envMap }} onClick={() => doubleDoorRef.current.open()} >ENTER</GLButton>
        </motion.group>
        {/* <motion.points position={vec3(0,1,-5)} scale={vec3(6,6,6)} initial={{rotateY:6, scaleY:3}} animate={{rotateY:0, scaleY:-3}} transition={{duration:13, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0xff4444} size={0.02} sizeAttenuation wireframe />
        </motion.points>
        <motion.points position={vec3(0,1,-5)} scale={vec3(6,6,6)} initial={{rotateY:-6, scaleX:1}} animate={{rotateY:0, scaleX:-1}} transition={{duration:23, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0x44ff44} size={0.02} sizeAttenuation wireframe />
        </motion.points>
        <motion.points position={vec3(0,1,-5)} scale={vec3(6,6,6)} initial={{rotateY:-6, scaleZ:1}} animate={{rotateY:0, scaleZ:-1}} transition={{duration:19, repeatType:'mirror', repeat:Infinity}} ref={centreNode} >
          <sphereGeometry args={[1,96,96]} />
          <pointsMaterial attach='material' color={0x4444ff} size={0.02} sizeAttenuation wireframe />
        </motion.points> */}
        {/* <ParticleSystem /> */}
      </Canvas>
      {/* </Suspense> */}
    </main >
  )
}

// 

