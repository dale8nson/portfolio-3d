'use client'
import { useRef, Suspense, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useCubeTexture, Html } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { GLButton } from '@/components/GLButton'
import { DoubleDoors } from '@/components/DoubleDoors'
import { EntryCamera } from '/components/EntryCamera'
import { Text } from '/components/Text'
import { vec3 } from '@/lib/utils'
import { VideoMesh } from '/components/VideoMesh'
import { Warning } from '/components/Warning'
import { Fence } from '/components/Fence'
import { Loading } from '/components/Loading'
import { Cursor } from '/components/Cursor'
// import { Excavator } from '/components/Excavator'


export default function Entrance() {
  useCubeTexture.preload(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], { path: '/' })

  const [cursorType, setCursorType] = useState('default')

  const canvasRef = useRef(null)
  const camRef = useRef(null)
  const pixelBoxRef = useRef(null)
  const doubleDoorRef = useRef(null)
  const lightFlareRef = useRef(null)
  const lightFlareClip = useRef(null)
  const lightFlareAction = useRef(null)
  const animRefs = useRef(null)
  const fenceAnims = useRef(null)

  if (fenceAnims.current) for (const anim of fenceAnims.current) anim.reset()

  const onCanvasLoad = node => {
    if (node) {
      const { outerWidth, outerHeight } = window
      node.setAttribute('width', outerWidth)
      node.setAttribute('height', outerHeight)
    }
  }

  const onFinished = () => router.push('/home')

  const onPointerOver = e => {
    setCursorType('pointer')
  }

  const onPointerOut = e => {
    setCursorType('default')
  }

  const onClick = () => {
    doubleDoorRef.current.open()
    camRef.current.play()
    console.log('cameRef.current: ', camRef.current)
    if (animRefs.current) {
      console.log('animRefs.current: ', animRefs.current)
      for (const anim of animRefs.current) {
        anim.clampWhenFinished = true
        setTimeout(() => {
          anim.startAt(0).reset().play()
        }, 3000)
      }
      for (const anim of fenceAnims.current)
        setTimeout(() => {
          anim.startAt(0).reset().play()
        }, 3000)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-black relative '>
      <Loading >
        <Canvas ref={onCanvasLoad} camera={{ manual: false }} dpr={1} >
          {/* <hemisphereLight intensity={1} /> */}
          <motion.group position={[0,0,0]} 
          initial={{ rotateY: -1.5 }} 
          animate={{ rotateY: 0 }} 
          transition={{ duration: 24, repeatType: 'mirror', repeat: Infinity }}>
            <DoubleDoors color={0} ref={doubleDoorRef} position={vec3(0, 0, -3)} scale={1.2} />
            <Fence position={[-0.15, -3.5, 0]} animRefs={fenceAnims} />
            <Warning position={[0, -0.9, -2.7]} animRefs={animRefs} />
            {/* <Excavator position={[0, -1, 0]} /> */}
            <VideoMesh url='/5680034-hd_1920_1080_24fps.mp4' scale={0.8} position={vec3(0, 0, -3.1)} />
            <motion.group position={vec3(0, 0, 10)} onFinished={onFinished}>
              <EntryCamera ref={camRef} >
              </EntryCamera>
            </motion.group>
            <motion.group style={{ transformOrigin: '50% 50%' }}>
              <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
              <motion.pointLight initial={{ x: 0, y: 2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} />
              <Text initial={{ x: 0, y: 5, z: 11, rotateY: 0, rotateY: -32 }} animate={{ x: 0, y: 3.5, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} position={vec3(0, 0.6, 0)} scale={vec3(0.75, 1, 1)} font='/Itai Protests_Regular.json' >
                WELCOME TO
              </Text>
            </motion.group>
            <Text position={vec3(9, 0, 0)} scale={0.7} initial={{ x: 0, y: 4, z: 5, rotateY: 13, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} animate={{ x: 0, y: 2.4, z: 0, rotateY: 0, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} transition={{ duration: 5 }} font='/Itai Protests_Regular.json' emissive={0xeebb00} attach='material-0' color={0xeebb00} shininess={100} refractionRatio={1} >
              DaleTristanHutchinson.com
            </Text>
            <GLButton position={vec3(0, 1.2, 0)} onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>ENTER</GLButton>
            <Cursor type={cursorType} />
          </motion.group>
        </Canvas>
      </Loading>
    </main>
  )
}