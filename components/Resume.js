import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { motionValue, animate } from 'framer-motion'
import { useFBX, useGLTF, OrbitControls, OrthographicCamera, PointerLockControls } from '@react-three/drei'
import { HomeButton } from '/components/HomeButton'
import { useRouter } from 'next/navigation'

extend([OrbitControls, PointerLockControls, OrthographicCamera])

export const Resume = ({ children }) => {
  const { camera, gl, get } = useThree()
  gl.domElement.style.cursor = 'none'
  const router = useRouter()
  const onClick = () => router.push('/home')
  camera.updateProjectionMatrix()

  // const resume = useGLTF('/resume/resume-animated.gltf')
  const resume = useFBX('/resume/resume3.fbx')
  const pointer = useGLTF('/3d-cursor.glb')

  const [onPointerOut, setOnPointerOut] = useState(null)
  const [onPointerOver, setOnPointerOver] = useState(null)

  console.log('onPointerOver: ', onPointerOver)
  console.log('resume: ', resume)

  camera.fov = 8

  const resumeRef = useRef(null)
  const mixer = useRef()
  const unscrumple = useRef([])
  const cursor = useRef(null)
  const point = useRef()
  const cursorMixer = useRef()

  const x = motionValue(camera.position.x)
  const y = motionValue(camera.position.y)
  const z = motionValue(camera.position.z)

  useEffect(() => {
    if (!resumeRef.current) return
    camera.position.set(-5, 8.5, 20)
    camera.aspect = window.innerWidth / window.innerHeight
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
      animate([[z, 20, { duration: 1.5, ease: 'easeInOut' }],
      [y, 8.5, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [x, -10, { duration: 1.5, at: 0, ease: 'easeInOut' }]
      ])
    })



    for (const action of unscrumple.current) action.reset().startAt(mixer.current.time + 0.05).play().paused = true

    setTimeout(() => {
      for (const action of unscrumple.current) action.reset().play()
    }, 1200)


    console.log('resumeRef.current:', resumeRef.current)
    console.log('unscrumple.current: ', unscrumple.current)

  }, [])

  gl.domElement.addEventListener('wheel', (e) => {
    e.preventDefault()
    console.log('mouse event: ', e)
    console.log(`x: ${x.get()}  y: ${y.get()}`)

    if (e.deltaY > 0) { // y.set(THREE.MathUtils.clamp(y.get() - 1, -40, 40))
      y.set(y.get() - 0.2)
      cpy.set(cpy.get() - 0.2)
    }


    else if (e.deltaY < 0) { // y.set(THREE.MathUtils.clamp(y.get() + 1, -40, 40))
      y.set(y.get() + 0.2)
      cpy.set(cpy.get() + 0.2)

    }

    else if (e.deltaX > 0) {
      x.set(THREE.MathUtils.clamp(x.get() + 0.2, -40, 40))
      cpx.set(cpx.get() + 0.2)
    }

    else if (e.deltaX < 0) {
      x.set(THREE.MathUtils.clamp(x.get() - 0.2, -40, 40))
      cpx.set(cpx.get() - 0.2)
    }
    console.log(`x: ${x.get()}  y: ${y.get()} z: ${z.get()}`)


  })

  const intensity = motionValue(2)
  const roughness = motionValue(0.3)
  const cpx = motionValue(camera.position.x)
  const cpy = motionValue(camera.position.y)
  const cpz = motionValue(camera.position.z - 0.1)

  const sz = new THREE.Vector4()

  useEffect(() => {
    if (!cursor.current) return
    console.log('pointer: ', pointer)
    cursorMixer.current = new THREE.AnimationMixer(cursor.current)
    console.log('cursorMixer.current: ', cursorMixer.current)
    console.log(`pointer.animations:`, pointer.animations)
    point.current = cursorMixer.current.clipAction(pointer.animations[0])
    point.current.setLoop(THREE.LoopOnce)
    point.current.clampWhenFinished = true
    point.current.setDuration(5)
    // point.current.reset().startAt(0).play()


  }, [])

  const pointerOverHandler = () => e => {
    console.log('pointerOver')
    point.current.setEffectiveTimeScale(1)
    point.current.reset().play().paused = false
  }

  const pointerOutHandler = () => e => {
    console.log('pointerOut')
    point.current.setEffectiveTimeScale(-1)
    point.current.play().paused = false
  }

  useEffect(() => {

    setOnPointerOver(pointerOverHandler)

    setOnPointerOut(pointerOutHandler)

  }, [])


  const updatePointer = e => {
    e.preventDefault()
    camera.updateProjectionMatrix()
    console.log('camera.position: ', camera.position)

    console.log('mousemove: ', e)
    gl.getViewport(sz)
    console.log('sz: ', sz)
    const { clientX, clientY } = e
    const screenX = ((clientX - sz.x) / sz.z) * 2 - 1
    const screenY = -((clientY - sz.y) / sz.w) * 2 + 1
    console.log(`screenX: ${screenX}  screenY: ${screenY}`)
    const normalizedZ = camera.position.clone().project(camera).z
    console.log(`normalizedZ: ${normalizedZ}`)
    const mouse = new THREE.Vector3(screenX, screenY, normalizedZ)
    mouse.unproject(get().camera)

    // animate(cpx, pos.x, { duration: 0.01 })
    // animate(cpy, pos.y, { duration: 0.01 })
    // animate(cpz, camera.position.z + cursorZ, { duration: 0.01 })
    cpx.set(mouse.x)
    cpy.set(mouse.y)
    cpz.set(get().camera.position.z - 0.01)

    if (cursor.current) console.log(`cursorX: ${cursor.current.position.x}  cursorY: ${cursor.current.position.y} cursorZ: ${cursor.current.position.z}`)
    console.log(`cpx: ${cpx.get()}  cpy: ${cpy.get()} cpz: ${cpz.get()}`)

  }

  gl.domElement.addEventListener('mousemove', updatePointer)
  animate(intensity, 5, { duration: 0.5 })

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
    if (cursorMixer.current) cursorMixer.current.update(delta)
  })

  return (
    <>
      <motion.group position={[cpx, cpy, cpz]}>
        <motion.primitive object={pointer.scene}
          scale={[1, 1, 1.5]}
          // scale={[0.5, 0.5, 0.65]}
          rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true} ref={cursor} renderOrder={50} />
        <motion.directionalLight position={[-.1, 0, .3]} intensity={1} target={pointer.scene} />
        <motion.directionalLight position={[-.2, 0, -.5]} intensity={intensity} target={pointer.scene} />
      </motion.group>
      <group position={[0, 0, 0]} scale={[1, 1, 1]} initial={{ rotateY: -Math.PI }} animate={{ rotateY: 0 }} transition={{ duration: 96, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }} >
        <motion.group position={[x, y, z]} scale={[1, 1, 1]} >
          <primitive object={camera} position={[0, 0, 0]} />
          <HomeButton onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut} position={[-3.1, 7.4, -5]} />
        </motion.group>

        {/* <hemisphereLight intensity={3} /> */}
        <motion.group position={[-10, 20, -16]}>
          <motion.primitive ref={resumeRef} object={resume} scale={[.0625, .0625, 1]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} initial={{ opacity: 0 }} renderOrder={-50}
          />
          <directionalLight position={[0.3, 0, -.2]} color={0xffffff} intensity={.1} target={resume} />
          <directionalLight position={[-0.3, 0, .2]} color={0xffffff} intensity={.1} target={resume} />
        </motion.group>
        {/* <motion.primitive object={pointer.scene} scale={[.00753125, -.00753125, .0075325]} position={[cpx, cpy, camera.position.z - 0.15]} rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true} ref={cursor} children-0-children-0-material-color={0xee0000} /> */}
        {/* <PointerLockControls /> */}
      </group>

    </>
  )
}