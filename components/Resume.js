import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { motionValue, animate, useMotionValue } from 'framer-motion'
import { useFBX, useGLTF, OrbitControls, OrthographicCamera, PointerLockControls } from '@react-three/drei'
import { HomeButton } from '/components/HomeButton'
import { useRouter } from 'next/navigation'

extend([OrbitControls, PointerLockControls, OrthographicCamera])

export const Resume = ({ children }) => {
  const { camera, gl, get } = useThree()
  // console.log('viewport: ', get().viewport)
  camera.position.set(0, 0, 0)
  gl.domElement.style.cursor = 'none'
  const router = useRouter()
  const onClick = () => router.push('/home')
  camera.updateProjectionMatrix()

  // const resume = useGLTF('/resume/resume-animated.gltf')
  const resume = useFBX('/resume/resume3.fbx')
  const pointer = useGLTF('/3d-cursor.glb')

  const [onPointerOut, setOnPointerOut] = useState(null)
  const [onPointerOver, setOnPointerOver] = useState(null)

  // console.log('onPointerOver: ', onPointerOver)
  // console.log('resume: ', resume)

  camera.fov = 8

  const resumeRef = useRef(null)
  const mixer = useRef()
  const unscrumple = useRef([])
  const cursor = useRef(null)
  const point = useRef()
  const cursorMixer = useRef()
  const cursorRef = useRef(null)
  const sceneRef = useRef(null)

  // const x = motionValue(camera.position.x)
  // const y = motionValue(camera.position.y)
  // const z = motionValue(camera.position.z)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(300)

  const intensity = motionValue(2)
  const roughness = motionValue(0.3)
  // const cpx = motionValue(get().camera.position.x)
  // const cpy = motionValue(get().camera.position.y)
  // const cpz = motionValue(get().camera.position.z - 0.01)
  const cpx = useMotionValue(0)
  const cpy = useMotionValue(0)
  const cpz = useMotionValue(-0.01)
  const pointerOpacity = motionValue(0)

  useEffect(() => {
    if (!resumeRef.current) return

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
      // console.log('animation finished')

      // animate(z, 0, {duration:1.5, ease:'easeInOut'})
      // z.set(0)
      animate([[z, 76, { duration: 1.5, ease: 'easeInOut' }],
      // [cpz, 76, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [y, 13.6, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      // [cpy, cpy.get() + 15, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      [x, 7.4, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      // [cpx, cpx.get() - 0.4, { duration: 1.5, at: 0, ease: 'easeInOut' }],
      ])
    })

    for (const action of unscrumple.current) action.reset().startAt(mixer.current.time + 0.05).play().paused = true

    setTimeout(() => {
      for (const action of unscrumple.current) action.reset().play()
    }, 1200)

    // console.log('resumeRef.current:', resumeRef.current)
    // console.log('unscrumple.current: ', unscrumple.current)

  })

  gl.domElement.addEventListener('wheel', (e) => {
    e.preventDefault()
    // console.log('mouse event: ', e)
    // console.log(`x: ${x.get()}  y: ${y.get()}`)

    if (e.deltaY > 0) {  
      y.set(THREE.MathUtils.clamp(y.get() - 0.1, -19.5, 17))
      // y.set(y.get() - 0.2)
      // cpy.set(cpy.get() - 0.08)
    }

    else if (e.deltaY < 0) { // 
      y.set(THREE.MathUtils.clamp(y.get() + 0.1, -19.5, 17))
      y.set(y.get() + 0.05)
      // cpy.set(cpy.get() + 0.08)

    }

    else if (e.deltaX > 0) {
      x.set(THREE.MathUtils.clamp(x.get() + 0.1, -8.8, 10.6))
      // cpx.set(cpx.get() + 0.08)
    }

    else if (e.deltaX < 0) {
      x.set(THREE.MathUtils.clamp(x.get() - 0.1, -8.8, 10.6))
      // cpx.set(cpx.get() - 0.08)
    }
    // console.log(`x: ${x.get()}  y: ${y.get()} z: ${z.get()}`)

  })

  const sz = new THREE.Vector4()

  useEffect(() => {
    if (!cursor.current) return
    // console.log('pointer: ', pointer)
    cursorMixer.current = new THREE.AnimationMixer(cursor.current)
    // console.log('cursorMixer.current: ', cursorMixer.current)
    // console.log(`pointer.animations:`, pointer.animations)
    point.current = cursorMixer.current.clipAction(pointer.animations[0])
    point.current.setLoop(THREE.LoopOnce)
    point.current.clampWhenFinished = true
    point.current.setDuration(5)
    // point.current.reset().startAt(0).play()

  }, [])

  const pointerOverHandler = () => e => {
    // console.log('pointerOver')
    point.current.setEffectiveTimeScale(1)
    point.current.reset().play().paused = false
  }

  const pointerOutHandler = () => e => {
    // console.log('pointerOut')
    point.current.setEffectiveTimeScale(-1)
    point.current.play().paused = false
  }

  useEffect(() => {

    setOnPointerOver(pointerOverHandler)

    setOnPointerOut(pointerOutHandler)

  }, [])


  const updatePointer = e => {
    if(!cursorRef.current) return
    // console.log('cursorRef.current: ', cursorRef.current)
    if (e.preventDefault) e.preventDefault()
    camera.updateProjectionMatrix()
    // console.log('camera.position: ', camera.position)

    // console.log('mousemove: ', e)
    gl.getSize(sz)
    // console.log('sz: ', sz)
    const { clientX, clientY } = e
    const screenX = ((clientX) / sz.x) * 2 - 1
    const screenY = -((clientY) / sz.y) * 2 + 1
    // console.log(`screenX: ${screenX}  screenY: ${screenY}`)
    // const normalizedZ = new THREE.Vector3(screenX, screenY, z.get() / 300).project(camera).z

    // console.log(`normalizedZ: ${normalizedZ}`)
    const mouse = new THREE.Vector3(screenX, screenY, 0)
    mouse.unproject(get().camera)
    // console.log('unprojected mouse: ', mouse)
    // mouse.applyMatrix4(cursorRef.current.matrix)
    // animate(cpx, pos.x, { duration: 0.01 })
    // animate(cpy, pos.y, { duration: 0.01 })
    // animate(cpz, camera.position.z + cursorZ, { duration: 0.01 })
    const cameraWorldPosition = new THREE.Vector3().setFromMatrixPosition(cursorRef.current.parent.matrixWorld)
    // console.log('cameraWorldPosition: ', cameraWorldPosition)
    // console.log('mouse world position: ', mouse)
    mouse.sub(cameraWorldPosition)
    cpx.set(mouse.x + 0.0005)
    cpy.set(mouse.y - 0.0008)
    // cpz.set(get().camera.position.z - 0.01)
    cpz.set(mouse.z)

    //if (cursor.current) // console.log(`cursorX: ${cursor.current.position.x}  cursorY: ${cursor.current.position.y} cursorZ: ${cursor.current.position.z}`)
    // console.log(`cpx: ${cpx.get()}  cpy: ${cpy.get()} cpz: ${cpz.get()}`)

  }

  gl.domElement.addEventListener('mousemove', updatePointer)
  animate(intensity, 5, { duration: 0.5 })

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta)
    if (cursorMixer.current) cursorMixer.current.update(delta)
    // const {x: clientX, y: clientY} = new THREE.Vector3(cpx.get(), cpy.get(), cpz.get()).project(camera)
    // console.log(`clientX: ${clientX}  clientY: ${clientY}`)
    // updatePointer({clientX, clientY })
  })

  return (
    <>
      {/* <motion.group position={[cpx, cpy, cpz]} initial={{ opacity: 1 }} 
      // style={{ opacity: pointerOpacity }}
      visible
      >
        <motion.primitive object={pointer.scene}
          // scale={[0.25, 0.25, 0.375]}
          scale={[4, 4, 6]}
          rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true} ref={cursor} renderOrder={50}
           />
        <motion.directionalLight position={[-.3, 0, .1]} intensity={0.5} target={pointer.scene} />
        <motion.directionalLight position={[-.2, 0, -.5]} intensity={intensity} target={pointer.scene} />
      </motion.group> */}
      <motion.group position={[0, 0, 0]} scale={[1, 1, 1]}
        initial={{ rotateY: -Math.PI }} 
        animate={{ rotateY: 0 }} 
        transition={{ duration: 96, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }}
        ref={sceneRef}
         />
        <motion.group position={[x, y, z]} scale={[1, 1, 1]} >
          <primitive object={camera} position={[0, 0, 0]} />
          <HomeButton onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut} position={[0.05, -0.025, -.5]} />
          <motion.group position={[cpx, cpy, -0.2]} initial={{ opacity: 1 }}
            visible
            ref={cursorRef}
          >
            <motion.primitive object={pointer.scene}
              scale={[.0125, .0125, .016625]}
              rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true} ref={cursor} renderOrder={50}
            />
            <motion.directionalLight position={[-.3, 0, .1]} intensity={0.5} target={pointer.scene} />
            <motion.directionalLight position={[-.2, 0, -.5]} intensity={intensity} target={pointer.scene} />
          </motion.group>
        </motion.group>
        {/* <hemisphereLight intensity={3} /> */}
        <motion.group position={[0, 0, 0]}>
          <motion.primitive ref={resumeRef} object={resume} scale={[.21, .15, 1]} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)} initial={{ opacity: 0 }} renderOrder={-50}
            // children-0-material-wireframe 
          />
          <directionalLight position={[0.6, 0, -.2]} color={0xffffff} intensity={.8} target={resume} />
          <directionalLight position={[0.03, 0, .06]} color={0xffffff} intensity={2} target={resume} />
        </motion.group>
        {/* <motion.primitive object={pointer.scene} scale={[.00753125, -.00753125, .0075325]} position={[cpx, cpy, camera.position.z - 0.15]} rotation={new THREE.Euler(-Math.PI / 2, Math.PI / 2, Math.PI)} visible={true} ref={cursor} children-0-children-0-material-color={0xee0000} /> */}
        {/* <PointerLockControls /> */}
      {/* </motion.group> */}
    </>
  )
}