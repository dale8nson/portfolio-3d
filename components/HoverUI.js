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

  const parchment = useTexture('/parchment.png')

  const htmlRef = useRef(null)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  return (
    <motion.group name={props.name} {...{ ...props }} ref={ref ?? null} >
      <motion.mesh name={props.name} position={[0, 0.3, 0]} scale={[3, 2.77, 1]}  >
        <planeGeometry args={[1,1]} />
        <meshBasicMaterial transparent opacity={opacity} wireframe={wireframe ? true : false} map={parchment} />
        <Html
          occlude
          transform
          position={vec3(0, 0, 0.001)}
          scale={.1}
          distanceFactor={0}
          ref={htmlRef}
        >
          {children}
        </Html>
      </motion.mesh>
    </motion.group>
  )
})