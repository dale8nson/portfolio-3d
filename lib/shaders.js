/* eslint-disable quotes */
import { forwardRef, useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { vec3 } from './utils'

const vertexShader = `

uniform samplerCube cubeMap1, cubeMap2;
uniform sampler2D map1, map2;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normalize(normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = `

uniform float progress, opacity;

varying vec2 vUv;
// varying vec3 vUv3;

void main() {

  gl_FragColor = vec4(r, g, b, opacity);
}
`

const waveVertexShader = `
    
varying vec2 vUv;
varying vec3 vNormal;

uniform float progress;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const pixelFragShader = `

uniform float progress1, progress2, opacity1, opacity2, colorBlend;
uniform samplerCube cubeMap1, cubeMap2;
uniform vec3 color;

varying vec3 vNormal;

void main() {
  float steps = 150.0;
  float percent1 = ceil(progress1 * steps) / steps;
  float percent2 = ceil(progress2 * steps) / steps;

  float resX1 = percent1 * 512.0;
  float resY1 = percent1 * 512.0;
  float resX2 = percent2 * 512.0;
  float resY2 = percent2 * 512.0;

  float x1, x2, y1, y2, z1, z2;

  x1 = ceil(vNormal.x * resX1) / resX1;
  y1 = ceil(vNormal.y * resX1) / resX1;
  z1 = ceil(vNormal.z * resX1) / resX1;
  x2 = ceil(vNormal.x * resX2) / resX2;
  y2 = ceil(vNormal.y * resX2) / resX2;
  z2 = ceil(vNormal.z * resX2) / resX2;

  vec3 rgb1 = color;

  rgb1 = textureCube(cubeMap1, vec3(x1, y1, z1)).rgb * ceil((1.0 - colorBlend) * steps) / steps;

  vec3 rgb2 = color;

  rgb2 = textureCube(cubeMap2, vec3(x2, y2, z2)).rgb * ceil(colorBlend * steps) / steps;

  gl_FragColor = vec4(rgb1 + rgb2, 1.0);

  }
`
export const pixellate = (({ map1, map2, cubeMap1, cubeMap2, color }) => {
  const mat = {
    uniforms: {
      progress1: { value: 1 },
      progress2: { value: 1 },
      opacity1: { value: 0 },
      opacity2: { value: 0 },
      color: { value: color || vec3(0, 0, 0) },
      colorBlend: { value: 0 },
      map1: { value: map1 || null },
      map2: { value: map2 || null },
      cubeMap1: { value: cubeMap1 || null },
      cubeMap2: { value: cubeMap2 || null },
    },
    vertexShader,
    fragmentShader: pixelFragShader,
  }

  return mat
})
export const PixelBox = forwardRef(function PixelPane({ map1, map2, color, cubeMap1, cubeMap2, ...props }, ref) {
  const mat = pixellate({ cubeMap1, cubeMap2, color })

  // ref = useRef(ref.current ?? null)
  const boxRef = useRef(null)

  const initRefs = useCallback(node => {
    if (!node) return
    ref.current = node
    boxRef.current = node
  }, [])

  const mixer = useRef(null)
  const progressTrack = useRef(null)
  const clip = useRef(null)
  const action = useRef(null)


  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    boxRef.current = node

    console.log('node: ', node)

    if (Object.hasOwn(node, 'progress1') || Object.hasOwn(node, 'map1') || Object.hasOwn(node, 'map2')) return

    Object.defineProperties(node, {
      map1: {
        get() { return this.material.uniforms.map1.value },
        set(value) { this.material.uniforms.map1.value = value }
      },
      map2: {
        get() { return this.material.uniforms.map2.value },
        set(value) { this.material.uniforms.map2.value = value }
      },
      progress1:
      {
        get() {
          console.log(`progress1: ${this.material.uniforms.progress1.value}`)
          return this.material.uniforms.progress1.value
        },
        set(value) { this.material.uniforms.progress1.value = value }
      },
      progress2:
      {
        get() {
          console.log(`progress2: ${this.material.uniforms.progress2.value}`)
          return this.material.uniforms.progress2.value
        },
        set(value) { this.material.uniforms.progress2.value = value }
      },
      colorBlend: {
        get() { return this.material.uniforms.colorBlend.value },
        set(value) { this.material.uniforms.colorBlend.value = value }
      },
      color: {
        get() { return this.material.uniforms.color.value },
        set(value) { this.material.uniforms.color.value = value }
      },
      cubeMap1: {
        get() { return this.material.uniforms.cubeMap1.value },
        set(value) { this.material.uniforms.cubeMap1.value = value }
      },
      cubeMap2: {
        get() { return this.material.uniforms.cubeMap2.value },
        set(value) { this.material.uniforms.cubeMap2.value = value }
      },
    })

    mixer.current = new THREE.AnimationMixer(node)
    progressTrack.current = new THREE.NumberKeyframeTrack('.progress1', [0, 1, 6], [1, 0.01, 0.01], THREE.InterpolateLinear)
    clip.current = new THREE.AnimationClip('', 6, [progressTrack.current, new THREE.NumberKeyframeTrack('.progress2', [0, 1, 6], [0.02, 0.02, 1], THREE.InterpolateLinear), new THREE.NumberKeyframeTrack('.colorBlend', [0, 1, 6], [0, 1, 1], THREE.InterpolateLinear)])
    action.current = mixer.current.clipAction(clip.current)
    action.current.setLoop(THREE.LoopOnce)
    action.current.clampWhenFinished = true

    node.resetAnimation = () => {
      action.current.reset()
      return this
    }

    node.playAnimation = () => {
      console.log('node.playAnimation()')
      action.current.reset().play()
      // return this
    }

  }, [])

  useFrame((_, delta) => {
    mixer.current.update(delta)
  })

  return (
    <>
      {(cubeMap1 || cubeMap2 || map1 || map2) &&
        (
          <motion.mesh {...{ ...props }} ref={ref}>
            <sphereGeometry args={[1, 1]} />
            <shaderMaterial args={[mat]} side={THREE.DoubleSide} />
          </motion.mesh >
        )}
    </>
  )
})


export const fogFrag = `

uniform float progress, opacity;
uniform sampler2D map;

varying vec2 vUv;

void main() {

  float threshold = 0.0;

  vec3 rgb = texture2D(map, vUv).rgb;

  float average = (rgb.r + rgb.g + rgb.b) / 3.0;

  if(average < threshold) discard;
  
  gl_FragColor = vec4(rgb.r, rgb.g, rgb.b, 1.0);

}
`

export class ShaderObj {
  fragmentShader = `

uniform float progress, opacity;
uniform sampler2D map;

varying vec2 vUv;

void main() {

  vec3 rgb = texture2D(map, vUv).rgb;

  gl_FragColor = vec4(rgb.r, rgb.g, rgb.b, opacity);
}
`

  vertexShader = `

varying vec2 vUv;
varying vec3 vNormal;


void main() {
  vUv = uv;
  vNormal = normalize(normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

  uniforms = {
    map: { value: null },
    progress: { value: 0 },
    opacity: { value: 1 }
  }

  constructor({ uniforms = {}, fragmentShader = this.fragmentShader, vertexShader = this.vertexShader }) {
    this.fragmentShader = fragmentShader
    this.vertexShader = vertexShader
    this.uniforms = { ...this.uniforms, ...Object.fromEntries(Object.entries(uniforms).map(([key, value]) => ([key, { value }]))) }

    console.log(`Object.entries(uniforms): `, Object.entries(uniforms))
  }
}


