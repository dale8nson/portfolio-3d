'use client'
import { forwardRef, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { vec3 } from '../lib/utils'
import { ShaderObj } from '../lib/shaders'

export const BaseShaderComponent = forwardRef(function BaseShaderComponent({ geometry, uniforms, fragmentShader, vertexShader, motionProps = {}, animations = [], position = vec3(0, 0, 0), scale = vec3(1, 1, 1), rotation = new THREE.Euler(0, 0, 0), mixer, setMixer, debug = false }, ref) {

  const clips = useRef([])
  const actions = useRef([])
  const componentRef = useRef(null)

  const shaderObj = new ShaderObj({ uniforms, fragmentShader, vertexShader })

  // console.log('shaderObj: ', shaderObj)

  useEffect(() => {
    // console.log(`BaseShaderComponent useEffect()`)
    // console.log(`componentRef.current: `, componentRef.current)
    if (!ref.current) return
    const node = ref.current
    // console.log(`shaderObj.uniforms: `, shaderObj.uniforms)
    const shaderUniforms = shaderObj.uniforms
    // console.log(`shaderUniforms: `, shaderUniforms)
    // console.log(`Object.getOwnPropertyNames(node).some(name => Object.hasOwn(shaderUniforms, name): `, Object.getOwnPropertyNames(node).some(name => Object.hasOwn(shaderUniforms, name)))

    if (Object.getOwnPropertyNames(node).some(name => Object.hasOwn(shaderUniforms, name))) return

    // console.log(`Object.keys(uniforms): `, Object.keys(uniforms))

    for (const key of Object.keys(uniforms)) {
      // console.log(`key: `, key)

      Object.defineProperty(node, key, {
        get() { return this.material.uniforms[key].value },
        set(value) { this.material.uniforms[key].value = value }
      })

    }

    setMixer( new THREE.AnimationMixer(node))

    for (const [name, { duration, tracks = [], functions = [], loop = THREE.LoopOnce, clampWhenFinished = true }] of Object.entries(animations)) {
      clips.current.push(new THREE.AnimationClip(name, duration, [...tracks]))
      actions.current.push(node.clipAction(clips.current[clips.current.length - 1]))
      actions.current(actions.current.length - 1).setLoop(loop).clampWhenFinished = clampWhenFinished

      node[`play${clips.current[clips.current.length - 1] === '' ? '' : func.name.replace(/^([a-z])/, ($1) => $1.toUpperCase())}`] = actions.current[actions.current.length - 1].reset().play()

      for (const func of functions) {
        node[func.name] = func
      }
    }

    // console.log(`ref.current: `, ref.current)

  }, [])


  useFrame((_, delta) => {
    if (mixer) mixer.update(delta)
  })

  return (
    <motion.mesh ref={ref} {...{ position, scale, rotation, motionProps }}>
      {geometry}
      <shaderMaterial attach="material" args={[shaderObj]} transparent wireframe={debug ? true : false} color={0xee0000} />
    </motion.mesh>
  )
})
