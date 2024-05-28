import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useMotionValue } from 'framer-motion'
import { motion } from 'framer-motion-3d'

export const Cursor = ({ type='default', distance=0.2 }) => {
  const { gl, camera, viewport, get } = useThree()
  const pointer = useGLTF('/3d-cursor.glb')

  const cursor = useRef(null)
  const point = useRef()
  const mixer = useRef()
  const ref = useRef(null)
  const oldType = useRef('default')
  const currentAction = useRef(null)

  const cpx = useMotionValue(0)
  const cpy = useMotionValue(0)
  const cpz = useMotionValue(-0.2)

  useEffect(() => {
    if (!cursor.current) return
    // gl.domElement.style.cursor = 'none'
    mixer.current = new THREE.AnimationMixer(cursor.current)
    point.current = mixer.current.clipAction(pointer.animations[0])
    point.current.setLoop(THREE.LoopOnce)
    point.current.clampWhenFinished = true
    point.current.setDuration(5)
    return () => gl.domElement.style.cursor = 'default'
  }, [])

  const updatePointer = e => {
    if (!ref.current) return
    if (e.preventDefault) e.preventDefault()

    camera.updateProjectionMatrix()
    gl.getSize(sz)

    const { clientX, clientY } = e
    const screenX = (clientX / sz.x) * 2 - 1
    const screenY = -(clientY / sz.y) * 2 + 1

    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)

    const cameraWorldPosition = new THREE.Vector3()
    camera.getWorldPosition(cameraWorldPosition)

    const worldPosition = cameraWorldPosition.clone().add(cameraDirection.multiplyScalar(distance))
    
    // worldPosition.applyMatrix4(ref.current.matrixWorld)

    // console.log('worldPosition: ', worldPosition)

    const projectedWorldPosition = worldPosition.clone().project(camera)
    const mouse = new THREE.Vector3(screenX, screenY, 0)

    mouse.z = projectedWorldPosition.z
    mouse.unproject(camera)
    mouse.applyMatrix4(ref.current.parent.matrixWorld.invert())

    cpx.set(mouse.x + 0.0058)
    cpy.set(mouse.y - 0.0037)
    cpz.set(mouse.z)
  }

  const sz = new THREE.Vector4()

  useEffect(() => {
    if (type !== oldType.current) {
      switch (type) {
        case 'pointer':
          point.current.setEffectiveTimeScale(1)
          point.current.reset().play()
          currentAction.current = point.current
          break
        default:
          // console.log('currentAction.current: ', currentAction.current)
          currentAction.current.setEffectiveTimeScale(-1)
          currentAction.current.play().paused = false
          // currentAction.current = null
          break
      }
    }
    oldType.current = type

  }, [type])

  gl.domElement.addEventListener('mousemove', updatePointer)

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
    // if(ref.current) ref.current.
  })

  return (
    <motion.group position={[cpx, cpy, cpz]} initial={{ opacity: 1 }}
      visible
      ref={ref}
    >
      <motion.primitive object={pointer.scene}
        scale={[.08, .08, .12]}
        rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true}
        ref={cursor}
        renderOrder={50}
      />
      <motion.directionalLight position={[-.3, 0, .1]} intensity={0.5} target={pointer.scene} />
      <motion.directionalLight position={[-.2, 0, -.5]} intensity={0.5} target={pointer.scene} />
    </motion.group>
  )

}