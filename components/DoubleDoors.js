import { forwardRef, useRef, useEffect} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { vec3 } from '@/lib/utils'

export const DoubleDoors = forwardRef(function DoubleDoors({color}, ref) {

  const leftDoor = useRef(null)
  const rightDoor = useRef(null)
  const leftDoorMixer =  useRef()
  const rightDoorMixer = useRef()
  const leftDoorClip =  useRef()
  const rightDoorClip = useRef()
  const leftDoorAction =  useRef()
  const rightDoorAction = useRef()

  useEffect(() => {
    if(!leftDoor.current || !rightDoor.current) return
    leftDoorMixer.current = new THREE.AnimationMixer(leftDoor.current)
    leftDoorClip.current = new THREE.AnimationClip('', 5, [new THREE.NumberKeyframeTrack('.position[x]', [0, 5], [-1.5, -3]), new THREE.NumberKeyframeTrack('.rotation[y]', [0, 5], [0, Math.PI * 0.75])])
    leftDoorAction.current = leftDoorMixer.current.clipAction(leftDoorClip.current)
    leftDoorAction.current.setLoop(THREE.LoopOnce)
    leftDoorAction.current.clampWhenFinished = true
    rightDoorMixer.current = new THREE.AnimationMixer(rightDoor.current)
    rightDoorClip.current = new THREE.AnimationClip('', 5, [new THREE.NumberKeyframeTrack('.position[x]', [0, 5], [1.5, 3]), new THREE.NumberKeyframeTrack('.rotation[y]', [0, 5], [0, -Math.PI * 0.75])])
    rightDoorAction.current = rightDoorMixer.current.clipAction(rightDoorClip.current)
    rightDoorAction.current.setLoop(THREE.LoopOnce)
    rightDoorAction.current.clampWhenFinished = true

    ref.current.open = () => {
      leftDoorAction.current.reset().play()
      rightDoorAction.current.reset().play()
    }
  })

  useFrame((_, delta) => {
    if(!leftDoorMixer.current || !rightDoorMixer.current) return
    leftDoorMixer.current.update(delta)
    rightDoorMixer.current.update(delta)
  })

  return (
    <motion.group ref={ref} position={vec3(0,0,-3)} scale={vec3(1.2, 1.2, 1.2)}>
      <motion.mesh position={vec3(-1.5, 0, 0)} scale={vec3(3, 8.5, 1)} ref={leftDoor}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </motion.mesh>
      <motion.mesh position={vec3(1.5, 0, 0)} scale={vec3(3, 8.5, 1)} ref={rightDoor}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </motion.mesh>
    </motion.group>
  )
})