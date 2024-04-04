import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { vec3 } from '@/lib/utils'

export const World = ({ worldMap }) => {

  const { camera } = useThree()

  const cameraMixer = useRef(null)
  const cameraKFT = useRef(null)
  const cameraClip = useRef(null)
  const cameraAction = useRef(null)

  useEffect(() => {

    cameraMixer.current = new THREE.AnimationMixer(camera)
    cameraClip.current = new THREE.AnimationClip('', 24, [new THREE.NumberKeyframeTrack('.rotation[y]', [0, 24], [.05, -.05]), new THREE.NumberKeyframeTrack('.position[x]', [0, 24], [-0.125, 0.125])])
    cameraAction.current = cameraMixer.current.clipAction(cameraClip.current)
    cameraAction.current.setLoop(THREE.LoopPingPong)
    // cameraAction.current.play()

  }, [camera])

  useFrame((_, delta) => {
    if(cameraMixer.current) cameraMixer.current.update(delta)
  })

  return (
    <>
      {worldMap && (
        <motion.mesh position={vec3(0, 0, 0)} scale={vec3(55, 55, 55)} >
          <motion.sphereGeometry args={[1, 1, 1]} />
          <meshPhongMaterial envMap={worldMap} color={0xffffff} shininess={100} side={THREE.DoubleSide} />
        </motion.mesh>)}
    </>
  )

}