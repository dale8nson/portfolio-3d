'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useTexture, useGLTF, useFBX, OrbitControls, PerspectiveCamera, DragControls, Text3D, CameraControls } from '@react-three/drei'
import { pixellate } from '@/lib/shaders'
import { motion } from 'framer-motion-3d'
import { animate, motionValue } from 'framer-motion'

extend([OrbitControls, PerspectiveCamera, DragControls, CameraControls, Text3D])

export default function Page() {
  const resumeRef = useRef(null)
  const camRef = useRef(null)
  const elRef = useRef(null)
  const mixer = useRef()
  const camMixer = useRef()
  const unscrumple = useRef([])
  const wheelCount = useRef(0)
  // const resume = useGLTF('/resume/resume.gltf')
  const resume = useFBX('/resume/resume3.fbx')
  console.log('resume: ', resume)

  const { camera, gl, size } = useThree()
  const wheelEventHandlerEnabled = useRef(true)

  console.log('camera.position: ', camera.position)

  const x = motionValue(camera.position.x)
  const y = motionValue(camera.position.y)
  const z = motionValue(camera.position.z)

  console.log('resume:', resume)

  const onAfterRender = () => {

    // mixer.current = new THREE.AnimationMixer(resumeRef.current)
    // for (const anim of resume.animations) {
    //   const action = mixer.current.clipAction(anim)
    //   action.setLoop(THREE.LoopOnce)
    //   action.clampWhenFinished = true
    //   // action.setDuration(4)
    //   unscrumple.current.push(action)
    // }

    // mixer.current.addEventListener('finished', () => {
    //   console.log('animation finished')
    //   animate([[z, -6.65, { duration: 1.5, ease: 'easeInOut' }],
    //   [y, 6.5, { duration: 1.5, at: 0, ease: 'easeInOut' }],
    //   [x, 1.75, { duration: 1.5, at: 0, ease: 'easeInOut' }]
    //   ])
    // })

    for (const action of unscrumple.current) action.reset().pause()
  }
 
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
      [y, 6.5, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [x, 1.75, { duration: 1.5, at: 0, ease: 'easeInOut' }]
      ])
    })

    let timeOut
    console.log('gl.domElement: ', Object.fromEntries(Object.entries(gl.domElement)))

    gl.domElement.addEventListener('wheel', (e) => {
      e.preventDefault()
      console.log('mouse event: ', e)
      console.log(`x: ${x.get()}  y: ${y.get()}`)
      // console.log('window: ', window)
   
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
    <group position={[0, 0, 0]} scale={[1, 1, 1]} ref={elRef}>
      {/* <PerspectiveCamera makeDefault position={[0, 0.8, 5]} /> */}
      <motion.group position={[x, y, z]}  >
        {/* <PerspectiveCamera makedefault manual ref={camRef}  /> */}
        <primitive object={camera} ref={camRef} />
      </motion.group>
      <hemisphereLight intensity={3} />
      {/* <ambientLight color={0x888800} intensity={1} /> */}
      {/* <pointLight position={[3, 4, -1]} intensity={2} />
      <pointLight position={[0.9, -0.9, -2]} intensity={2} />
      <pointLight position={[-3, 4, -1]} intensity={2} />
      <pointLight position={[-0.5, -0.9, 0]} intensity={2} /> */}
      <motion.primitive ref={resumeRef} object={resume} scale={[.045, .035, .03]} position={[0, 3.8, -3]} rotation={new THREE.Euler(0, 0, 0)} initial={{opacity: 0}}  />
      {/* <OrbitControls /> */}
    </group>
  )
}