'use client'
import { forwardRef, useEffect, useState, useRef, useTransition } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useMotionValue, animate } from 'framer-motion'
import { vec3, useMixer, useClip, useAction } from '@/lib/utils'
import { Text3D, Html, useCubeTexture } from '@react-three/drei'

export const GLButton = forwardRef(function GLButton({ position, emissive, onClick = () => null, onPointerOver, onPointerOut, children }, ref) {

  const [buttonNode, setButtonNode] = useState(null)
  const [isPending, startTransition] = useTransition()

  const rotateX = useMotionValue(0)
  const animateHover = animate(rotateX, 100, { duration: 0.5 })

  const buttonRef = useRef(null)

  const { mixer: hover, isLoading } = useMixer(buttonNode)

  // const hoverMixer = useRef(null)
  const hoverClip = useRef(null)
  const hoverKFT = useRef(null)
  const hoverAction = useRef(null)
  // const isHovering = useRef(false)

  const unHoverMixer = useRef(null)
  const unHoverClip = useRef(null)
  const unHoverKFT = useRef(null)
  const unHoverAction = useRef(null)

  const cubeMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], { path: '/' })

  const initButtonNode = node => {
    if (!node) return
    node.geometry.computeBoundingBox()
    node.geometry.center()

    setButtonNode(node)

  }

  // const playHover =
  //   () => {
  //     if (!buttonNode) return
  //     // useCallback(() => {
  //     if (!hover || isLoading) return
  //     if (!isHovering.current) {
  //       buttonNode.geometry.computeBoundingBox()
  //       buttonNode.geometry.center()
  //       hoverAction.current.reset().play()
  //       isHovering.current = true
  //     }
  //   }
  // }, [])

  // const resetHover =
  //   () => {
  //     if (!buttonNode) return
  //     // useCallback(() => {
  //     if (isHovering.current) {
  //       unHoverAction.current.reset().play()
  //       isHovering.current = false
  //     }
  //   }
  // }, [hover, isLoading])

  const { x, y, z } = position

  useEffect(() => {
    if (!buttonNode || !hover) return
    // hoverMixer.current = new THREE.AnimationMixer(buttonRef.current)
    hoverKFT.current = new THREE.NumberKeyframeTrack('.rotation[x]', [0, 1], [0, Math.PI / 180 * -20])
    hoverClip.current = new THREE.AnimationClip('', 1, [hoverKFT.current, new THREE.NumberKeyframeTrack('.scale[x]', [0, 1], [0.5, 1])])
    hoverAction.current = hover.clipAction(hoverClip.current)
    hoverAction.current.loop = THREE.LoopOnce
    hoverAction.current.clampWhenFinished = true

    unHoverMixer.current = new THREE.AnimationMixer(buttonNode)
    unHoverKFT.current = new THREE.NumberKeyframeTrack('.rotation[x]', [0, 1], [Math.PI / 180 * -20, 0])
    unHoverClip.current = new THREE.AnimationClip('', 1, [unHoverKFT.current, new THREE.NumberKeyframeTrack('.scale[x]', [0, 1], [1, 0.5])])
    unHoverAction.current = unHoverMixer.current.clipAction(unHoverClip.current)
    unHoverAction.current.loop = THREE.LoopOnce
    unHoverAction.current.clampWhenFinished = true

  }, [buttonNode, hover])

  useFrame((_, delta) => {
    if (isLoading || !hover) return
    hover.update(delta)
    unHoverMixer.current.update(delta)
  })

  // if (!cubeMap) return (
  //   <mesh position={vec3(0,0,0)} scale={vec3(5,5,5)}>
  //     <planeGeometry args={[1, 1]} />
  //     <meshBasicMaterial color={0x000000} />
  //     <Html>
  //       <div className='bg-black h-screen w-screen flex align-middle justify-center'>
  //         <div className='w-4/12 m-auto'>
  //           <h1 className='text-black text-4xl'>LOADING...</h1>
  //         </div>
  //       </div>
  //     </Html>
  //   </mesh>
  // )

  // if(isPending) return <Html><h1 className='text-white'>LOADING...</h1></Html>


  return (
    <>
      <motion.group whileHover={{ z: 1 }} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onClick={onClick} >
        <motion.mesh position={[x, y - 0.1, z + 1.1]} >
          <motion.planeGeometry args={[2.85, 0.8, 10, 10]}  />
          <meshBasicMaterial color={0xee0000} scale={0.00000000000001} transparent opacity={0}  />
        </motion.mesh>
        <motion.mesh position={position} initial={{ z: 0 }} scale={vec3(0.75, 0.75, 0.5)}  transition={{ duration: 0.5 }}   ref={ref} >

          <motion.pointLight initial={{ x: -1.5, y: 0, z: 3, rotateY: 0, rotateX: 0 }} animate={{ x: 1.5, y: 0, z: 3, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={30} scale={vec3(1, 1, 1)} />
          <motion.pointLight initial={{ x: 1.5, y: 0, z: 3, rotateY: 0, rotateX: 0 }} animate={{ x: -1.5, y: 0, z: 3, rotateY: 0, rotateX: 0, opacity: 1 }} transition={{ duration: 2, repeatType: 'mirror', repeat: Infinity }} intensity={30} scale={vec3(1, 1, 1)} />
          <Text3D position={vec3(0, 0, 0)} scale={vec3(1, 1, 1)} font='/Itai Protests_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.01} bevelThickness={0.004} style={{ transformOrigin: 'center' }} ref={initButtonNode} >
            {children}
            <motion.meshPhongMaterial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5 }} envMap={cubeMap} emissive={0xeebb00} attach='material-0' color={0xeebb00} shininess={100} refractionRatio={1} transparent />
            <motion.meshPhongMaterial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5 }} envMap={cubeMap} emissive={0xeebb00} attach='material-1' color={0xeebb00} shininess={100} refractionRatio={1} transparent />
          </Text3D>
        </motion.mesh>
      </motion.group>

    </>
  )
})


// initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, delay: 5 }}