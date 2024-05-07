'use client'
import { forwardRef, useEffect, useState, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useMotionValue, animate } from 'framer-motion'
import { vec3, useMixer, useClip, useAction } from '@/lib/utils'
import { Text3D, Html, Text } from '@react-three/drei'

extend([Text3D, Text])

export const GLButton2 = forwardRef(function GLButton({emissive, shininess, color, onClick = () => null,font, children, ...props }, ref) {

  const [buttonNode, setButtonNode] = useState(null)

  const rotateX = useMotionValue(0)
  const z = useMotionValue(0)
  const animateHover = animate(rotateX, 100, { duration: 0.5 })

  const buttonRef = useRef(null)

  const { mixer: hover, isLoading } = useMixer(buttonNode)

  const hoverMixer = useRef(null)
  const hoverClip = useRef(null)
  const hoverKFT = useRef(null)
  const hoverAction = useRef(null)
  const isHovering = useRef(false)
  const unHoverMixer = useRef(null)
  const unHoverClip = useRef(null)
  const unHoverKFT = useRef(null)
  const unHoverAction = useRef(null)

  const initButtonNode = node => {
    if (!node) return
    node.geometry.computeBoundingBox()
    node.geometry.center()
    setButtonNode(node)
  }

  const playHover =
    () => {
      if (!buttonNode) return
      // useCallback(() => {
      if (!hover || isLoading) return
      if (!isHovering.current) {
        buttonNode.geometry.computeBoundingBox()
        buttonNode.geometry.center()
        hoverAction.current.reset().play()
        isHovering.current = true
      }
    }
  // }, [])

  const resetHover =
    () => {
      if (!buttonNode) return
      // useCallback(() => {
      if (isHovering.current) {
        unHoverAction.current.reset().play()
        isHovering.current = false
      }
    }
  // }, [hover, isLoading])

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

  return (
    <>
      <motion.mesh initial={{ z: 0 }} whileHover={{ z: 2 }} transition={{ duration: 0.5 }} onClick={onClick} {...{...props}} ref={ref} >
        <Text position={vec3(0, 0, 0)} font='/nasalization-rg.otf' scale={vec3(1, 1, 1)} bevelEnabled bevelSegments={10} bevelSize={.01} bevelThickness={0.004} ref={initButtonNode} >
          {children}
          <motion.meshPhongMaterial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} emissive={emissive} attach='material-0' color={color} shininess={shininess}  refractionRatio={1} transparent />
          <motion.meshPhongMaterial initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: 2}}  emissive={emissive} attach='material-1' color={color} shininess={shininess} refractionRatio={1} transparent />
        </Text>
      </motion.mesh>
    </>
  )
})


// initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, delay: 5 }}