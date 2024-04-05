import { forwardRef, useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { vec3 } from './utils'

const vertexShader = `

uniform samplerCube cubeMap1, cubeMap2;
uniform sampler2D map1, map2;

varying vec2 vUv2;
varying vec3 vNormal;


void main() {
  vUv2 = uv;
  vNormal = normal;
  // vUv3 = uv;
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
uniform sampler2D map1, map2;
uniform samplerCube cubeMap1, cubeMap2;
uniform vec3 color;

varying vec2 vUv2;
varying vec3 vNormal;
// varying vec3 vUv3;

void main() {
  float percent1 = ceil(progress1 * 50.0) / 50.0;
  float percent2 = ceil(progress2 * 50.0) / 50.0;

  float resX1 = percent1 * 512.0;
  float resY1 = percent1 * 512.0;
  float resX2 = percent2 * 512.0;
  float resY2 = percent2 * 512.0;

  float x1, x2, y1, y2, z1, z2;

  x1 = y1 = z1 = ceil(normalize(vNormal).x * resX1) / resX1;
  x2 = y2 = z2 = ceil(normalize(vNormal).x * resX2) / resX2;


  // #ifdef map1
  // x1 = ceil(vUv2.x * resX1) / resX1;
  // y1 = ceil(vUv2.y * resY1) / resY1;
  // x2 = ceil(vUv2.x * resX2) / resX2;
  // y2 = ceil(vUv2.y * resY2) / resY2;

  // #endif

  // #ifdef cubeMap1

  // x1 = ceil(vUv3.x * resX1) / resX1;
  // y1 = ceil(vUv3.y * resY1) / resY1;
  // z2 = ceil(vUv3.z * resZ1) / resZ2;

  // x2 = ceil(vUv2.x * resX2) / resX2;
  // y2 = ceil(vUv2.y * resY2) / resY2;
  // z2 = ceil(vUv3.z * resZ2) / resZ2;


  vec3 rgb1 = color;
  // #ifdef map1

  //    rgb1 = texture2D(map1, vec2(x1, y1)).rgb * ceil((1.0 - colorBlend) * 150.0) / 150.0;
  

    rgb1 = textureCube(cubeMap1, normalize(vNormal)).rgb * ceil((1.0 - colorBlend) * 50.0) / 50.0;

  vec3 rgb2 = color;

  //  rgb2 = texture2D(map2, vec2(x2, y2)).rgb * ceil(colorBlend * 100.0) / 100.0;

    rgb2 = textureCube(cubeMap2, normalize(vNormal)).rgb * ceil(colorBlend * 150.0) / 50.0;

  gl_FragColor = vec4(rgb1 + rgb2, 1.0);
  // gl_FragColor = textureCube(cubeMap1, normalize(vNormal));


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

    if (Object.hasOwn(node, 'progress') || Object.hasOwn(node, 'map1') || Object.hasOwn(node, 'map2')) return

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
    progressTrack.current = new THREE.NumberKeyframeTrack('.progress1', [0, 5], [0, 1], THREE.InterpolateLinear)
    clip.current = new THREE.AnimationClip('', 5, [progressTrack.current, new THREE.NumberKeyframeTrack('.progress2', [0, 5], [1, 0], THREE.InterpolateLinear), new THREE.NumberKeyframeTrack('.colorBlend', [0, 5], [0, 1], THREE.InterpolateLinear)])
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