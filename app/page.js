'use client'
import { useRef, useEffect, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { GLButton } from '@/components/GLButton'
import { DoubleDoors } from '@/components/DoubleDoors'
import { EntryCamera } from '/components/EntryCamera'
import { Text } from '/components/Text'
import { vec3 } from '@/lib/utils'
import { VideoMesh } from '/components/VideoMesh'
import { Warning } from '/components/Warning'
import { Fence } from '/components/Fence'
import { Excavator } from '/components/Excavator'


export default function Entrance() {
  const canvasRef = useRef(null)
  const camRef = useRef(null)
  const pixelBoxRef = useRef(null)
  const doubleDoorRef = useRef(null)
  const lightFlareRef = useRef(null)
  const lightFlareClip = useRef(null)
  const lightFlareAction = useRef(null)
  const animRefs = useRef(null)
  const fenceAnim = useRef(null)

  console.log('lightFlareRef.current: ', lightFlareRef.current)
  let envMap, worldMap

  const [envMapState, setEnvMapState] = useState(null);
  envMap = envMapState;
  const [worldMapState, setWorldMapState] = useState(null);
  const [mixer, setMixer] = useState(null)

  worldMap = worldMapState

  useEffect(() => {

    if (!canvasRef.current) return
    console.log('canvasRef.current: ', canvasRef.current)

    console.log('pixelBoxRef.current: ', pixelBoxRef.current)
    if (typeof window !== 'undefined') {
      const { outerWidth, outerHeight } = window;
      canvasRef.current.setAttribute('width', outerWidth)
      canvasRef.current.setAttribute('height', outerHeight)
    }

    setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png']))

    setEnvMapState(new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']))

  }, [])

  useEffect(() => {
    if (!mixer) return

    const lightFlareTrack = new THREE.NumberKeyframeTrack('.progress', [0, 0.5, 6], [0, 0.6, 1])
    const lightFlareMoveTrack = new THREE.NumberKeyframeTrack('.position[z]', [0, 6], [-3.5, -2.5])
    lightFlareClip.current = new THREE.AnimationClip('', 6, [lightFlareTrack, lightFlareMoveTrack])
    lightFlareAction.current = mixer.clipAction(lightFlareClip.current)
    lightFlareAction.current.setLoop(THREE.LoopOnce)
    lightFlareAction.current.clampWhenFinished = true

    mixer.addEventListener('finished', () => router.push('/home'))

    console.log('mixer: ', mixer)

  }, [mixer])

  const onFinished = () => router.push('/home')

  const onClick = () => {
    doubleDoorRef.current.open()
    camRef.current.play()
    console.log('cameRef.current: ', camRef.current)
    if (animRefs.current) {
      console.log('animRefs.current: ', animRefs.current)
      for (const anim of animRefs.current) {

        if (animRefs.current) {
          console.log('animRefs.current: ', animRefs.current)
          for (const anim of animRefs.current) {

            anim.clampWhenFinished = true
            anim.setLoop(THREE.LoopOnce)
            setTimeout(() => {
              anim.startAt(0).reset().play()
              fenceAnim.current.startAt(0).reset().play()
            }, 3000)
          }
        }
      }
    }
  }

  if (envMapState && worldMapState) {
    envMapState.mapping = THREE.CubeReflectionMapping;
    worldMapState.mapping = THREE.CubeRefractionMapping;
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-black '>
      <Canvas ref={canvasRef} camera={{ manual: false }}>
        {/* <hemisphereLight intensity={1} /> */}
        <motion.group initial={{ rotateY: -1.5 }} animate={{ rotateY: 0 }} transition={{ duration: 24, repeatType: 'mirror', repeat: Infinity }}>
          <DoubleDoors color={0} ref={doubleDoorRef} position={vec3(0, 0, -3)} scale={1.2} />
          <Fence position={[-0.15, -3.5, 0]} animRef={fenceAnim} />
          <Warning position={[0, -0.9, -2.7]} envMap={envMap} animRefs={animRefs} />
          <Excavator position={[0, -1, 0]} />
          <VideoMesh url='/5680034-hd_1920_1080_24fps.mp4' scale={1} position={vec3(0, 0, -3.1)} />
          <EntryCamera ref={camRef} position={vec3(0, 0, 10)} onFinished={onFinished} />
          {envMap && <motion.group style={{ transformOrigin: '50% 50%' }}>
            <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
            <motion.pointLight initial={{ x: 0, y: 2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
            <Text envMap={envMap} initial={{ x: 0, y: 5, z: 11, rotateY: 0, rotateY: -32 }} animate={{ x: 0, y: 3.5, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} position={vec3(0, 0.6, 0)} scale={vec3(0.75, 1, 1)} font='/Itai Protests_Regular.json' >
              WELCOME TO
            </Text>
          </motion.group>}
          <Text position={vec3(9, 0, 0)} scale={0.7} initial={{ x: 0, y: 4, z: 5, rotateY: 13, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} animate={{ x: 0, y: 2.4, z: 0, rotateY: 0, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} transition={{ duration: 5 }} font='/Itai Protests_Regular.json' envMap={envMap} emissive={0xeebb00} attach='material-0' color={0xeebb00} shininess={100} refractionRatio={1} >
            DaleTristanHutchinson.com
          </Text>
          <GLButton {...{ cubeMap: envMap }} position={vec3(0, 1.2, 0)} onClick={onClick}>ENTER</GLButton>
        </motion.group>
      </Canvas>
    </main>
  )
}