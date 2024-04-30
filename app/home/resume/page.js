'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useTexture, useGLTF, useFBX, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { pixellate } from '@/lib/shaders'
import { motion } from 'framer-motion-3d'
import { animate, motionValue } from 'framer-motion'

extend([OrbitControls, PerspectiveCamera])

export default function Page() {
  const resumeRef = useRef(null)
  const camRef = useRef(null)
  const mixer = useRef()
  const camMixer = useRef()
  const unscrumple = useRef([])
  // const resume = useGLTF('/resume/resume.gltf')
  const resume = useFBX('/resume/resume.fbx')

  const { camera, gl } = useThree()
  const wheelEventHandlerEnabled = useRef(true)

  console.log('camera.position: ', camera.position)

  const x = motionValue(camera.position.x)
  const y = motionValue(camera.position.y)
  const z = motionValue(camera.position.z)


  console.log('resume:', resume)

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
    // unscrumple.current.setDuration(3)

    console.log('mixer.current: ', mixer.current)
    // unscrumple.current.play()
    // for (const action of unscrumple.current) action.reset().play()

    console.log('resumeRef.current:', resumeRef.current)

    // camMixer.current = new THREE.AnimationMixer(camRef.current)
    // const camClip = new THREE.AnimationClip('',)

    mixer.current.addEventListener('finished', () => {
      console.log('animation finished')
      animate([[z, -6.65, { duration: 1.5, ease: 'easeInOut' }],
      [y, 4.25, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [x, 1.75, { duration: 1.5, at: 0, ease: 'easeInOut' }]
      ])
    })

    gl.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
      if (!wheelEventHandlerEnabled.current) return
      wheelEventHandlerEnabled.current = false
      console.log('wheel event: ', e)
      console.log('camera position: ', camera.position)
      if (e.deltaY > 0) {
        animate(y, y.get() - 0.5, { duration: 0.5 })

      }
      if (e.deltaY < 0) {
        animate(y, y.get() + 0.5, { duration: 0.5 })
      }
      if (e.deltaX < 0) {
        animate(x, x.get() - 0.5, { duration: 0.5 })
      }

      if (e.deltaX > 0) {
        animate(x, x.get() + 0.5, { duration: 0.5 })
      }

      setTimeout(() => wheelEventHandlerEnabled.current = true, 800)
      // 
    })

    setTimeout(() => {
      for (const action of unscrumple.current) action.play()
    }, 1000)

  }, [])

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
  })

  return (
    <group position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* <PerspectiveCamera makeDefault position={[0, 0.8, 5]} /> */}
      <motion.group position={[x, y, z]}  >
        {/* <PerspectiveCamera makedefault ref={camRef}  /> */}
        <primitive object={camera} ref={camRef} />
      </motion.group>
      <hemisphereLight intensity={2} />
      {/* <ambientLight color={0x888800} intensity={1} /> */}
      {/* <pointLight position={[3, 4, -1]} intensity={2} />
      <pointLight position={[0.9, -0.9, -2]} intensity={2} />
      <pointLight position={[-3, 4, -1]} intensity={2} />
      <pointLight position={[-0.5, -0.9, 0]} intensity={2} /> */}
      <motion.primitive ref={resumeRef} object={resume} scale={[.045, .035, .03]} position={[0, 3.8, -3]} rotation={new THREE.Euler(0, 0, 0)} />
      {/* <OrbitControls /> */}
    </group>
  )
}