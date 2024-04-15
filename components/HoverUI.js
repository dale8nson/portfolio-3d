'use client'
import { useRef, useEffect, createElement, forwardRef } from 'react'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { Html, MeshWobbleMaterial, MeshReflectorMaterial, Outlines, Edges, Trail, useGLTF, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { vec2, vec3 } from '/lib/utils'
import { DigitalGlitch, DotScreenShader, FilmShader, FocusShader, FXAAShader, HorizontalBlurShader, KaleidoShader, MirrorShader, ParallaxShader, SobelOperatorShader, TechnicolorShader, ToonShader, WaterRefractionShader } from 'three-stdlib'
import { BaseShaderComponent } from './BaseShaderComponent'
import { ShaderLib } from 'three'

extend([Html, MeshWobbleMaterial, MeshReflectorMaterial, Edges, Trail, Outlines, BaseShaderComponent])

export const HoverUI = forwardRef(function HoverUI({ children, opacity, wireframe, backgroundImage, debug, ...props }, ref) {

  const htmlRef = useRef(null)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  // const { fragmentShader, vertexShader, uniforms } = FilmShader
  // console.log('uniforms: ', uniforms)
  // uniforms.tDiffuse.value = map
  // uniforms.color.value = 0x0000aa
  // uniforms.time.value = 0.1
  // uniforms.tDudv.value = 0.5
  // uniforms.textureMatrix.value = new THREE.Matrix4([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  // uniforms.resolution.value = vec2(512, 512)
  // uniforms.byp.value = 0.


  // const material = createElement('shaderMaterial', { args: [phong] })

  useEffect(() => {
    console.log('CubeUI useEffect')
    // if (!htmlRef.current) return
    // if (!ref?.current) return
    // console.log(`ref.current: `, ref.current)
    console.log(`htmlRef.current: `, htmlRef.current)
  }, [])

  return (
    <motion.group name={props.name} {...{ ...props }} ref={ref ?? null} >
      <motion.mesh name={props.name} position={[0, 0.3, 0]} scale={[3, 2.77, 1]}  >
        <planeGeometry args={[1,1]} />
        <meshBasicMaterial transparent opacity={opacity} wireframe={wireframe ? true : false} map={backgroundImage} />
        <Html
          occlude
          transform
          position={vec3(0, 0, 0.001)}
          scale={.1}
          distanceFactor={0}
          ref={htmlRef}
        // geometry={<planeGeometry args={[1, 1]} />}
        // material={<meshBasicMaterial {...{ color: new THREE.Color(0x000000)}} transparent opacity={0.5} attach='material' />}
        >
          {children}
        </Html>
      </motion.mesh>
    </motion.group>
  )
})