import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { motionValue, animate } from 'framer-motion'
import { useFBX } from '@react-three/drei'

export const Resume = ({ children }) => {
  const { camera, gl } = useThree()
  const resume = useFBX('/resume/resume3.fbx')

  const resumeRef = useRef(null)
  const mixer = useRef(new THREE.AnimationMixer)
  const unscrumple = useRef([])

  const x = motionValue(camera.position.x)
  const y = motionValue(camera.position.y)
  const z = motionValue(camera.position.z)

  useEffect(() => {
    if (!resumeRef.current) return
    console.log('resumeRef.current:', resumeRef.current)

    mixer.current = new THREE.AnimationMixer(resumeRef.current)
    for (const anim of resume.animations) {
      const action = mixer.current.clipAction(anim)
      action.setLoop(THREE.LoopOnce)
      action.clampWhenFinished = true
      // action.setDuration(4)
      unscrumple.current.push(action)
    }

    mixer.current.addEventListener('finished', () => {
      console.log('animation finished')
      animate([[z, -6.65, { duration: 1.5, ease: 'easeInOut' }],
      [y, 6.5, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [x, 1.75, { duration: 1.5, at: 0, ease: 'easeInOut' }]
      ])
    })

    gl.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
      console.log('mouse event: ', e)
      console.log(`x: ${x.get()}  y: ${y.get()}`)

      if (e.deltaY > 0)
        y.set(THREE.MathUtils.clamp(y.get() - 0.08, -1.1, 7.9))

      else if (e.deltaY < 0)
        y.set(THREE.MathUtils.clamp(y.get() + 0.08, -1.1, 7.9))

      else if (e.deltaX > 0)
        x.set(THREE.MathUtils.clamp(x.get() + 0.08, -1.7, 2.2))

      else if (e.deltaX < 0)
        x.set(THREE.MathUtils.clamp(x.get() - 0.08, -1.7, 2.2))
    })

    for (const action of unscrumple.current) action.startAt(0).play().paused = true

    setTimeout(() => {
      for (const action of unscrumple.current) action.reset().play()
    }, 200)
  })

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
  })

  return (
    <motion.group position={[0, 0, 0]} scale={[1, 1, 1]} initial={{ rotateY: -Math.PI }} animate={{ rotateY: 0 }} transition={{ duration: 96, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }} >
      <motion.group position={[x, y, z]} >
        <primitive object={camera} />
        {children}
        <pointLight position={[1.2, -0.47, 10]} intensity={0.2} />
        <pointLight position={[1.2, -0.47, 10]} intensity={0.2} />
        {children}
      </motion.group>
      <hemisphereLight intensity={3} />
      <motion.primitive ref={resumeRef} object={resume} scale={[.045, .035, .03]} position={[0, 3.8, -3]} rotation={new THREE.Euler(0, 0, 0)} initial={{ opacity: 0 }} />
    </motion.group>
  )
}