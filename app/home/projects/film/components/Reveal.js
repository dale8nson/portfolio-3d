'use client'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useThree, useLoader, useFrame, extend } from '@react-three/fiber'
import { reveal, pixellate } from './shaders'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { Text3D } from '@react-three/drei'

extend({ TextGeometry })

export const Reveal = ({ selectedFilmId, localUrl, films }) => {

  const meshRef = useRef(null)

  const revealRef = useRef(null)
  const hideRef = useRef(null)
  const revealMixerRef = useRef(null)
  const hideMixerRef = useRef(null)
  const revealClipRef = useRef(null)
  const colorRippleClipRef = useRef(null)
  const colorRippleRef = useRef(null)
  const hideClipRef = useRef(null)
  const backdropRef = useRef(null)
  const pixellateRef = useRef(null)
  const pixellateMixerRef = useRef(null)
  const pixellateClipRef = useRef(null)

  const oldMap = useRef(null)

  let title, titleColor

  const imgUrls = Object.fromEntries(films.map(film => [film.id, film.backdrop_path]))

  console.log(`localUrl: `, localUrl)
  console.log(`imgUrls: `, imgUrls)


  const rgbArrayToHex = (arr) => arr.map(col => col.toString(16).padStart(2, '0')).join('')

  const titles = useMemo(() => Object.fromEntries(films.map(film => [film.id, film.title])), [])
  const titleColors = useMemo(() => Object.fromEntries(films.map(film => [film.id, film.titleColor])), [])

  title = titles[selectedFilmId]
  titleColor = titleColors[selectedFilmId]

  const maps = useRef(
    Object.fromEntries(films.map(film => {
      const url = `${localUrl}${imgUrls[film.id]}`
      const map = useLoader(THREE.TextureLoader, url)
      console.log(`map: `, map)
      map.WrapS = THREE.RepeatWrapping
      map.WrapT = THREE.RepeatWrapping
      return [film.id, map]
    }))
  )

  const progress1NKT = useMemo(() => new THREE.NumberKeyframeTrack('.progress1', [0,  0.2, 0.4, 6], [1, 0.02, 0.02, 0.02], THREE.InterpolateLinear), [])
  const progress2NKT = useMemo(() => new THREE.NumberKeyframeTrack('.progress2', [0, 0.2, 0.4, 6], [0.02, 0.02, 0.02, 1], THREE.InterpolateLinear), [])
  const colorBlendNKT = useMemo(() => new THREE.NumberKeyframeTrack('.colorBlend', [0, 0.2, 0.4, 6], [0, 0, 1, 1], THREE.InterpolateLinear), [])

  useEffect(() => {

    console.log(`backdropRef.current: `, backdropRef.current)
    const node = backdropRef.current

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
        get() { return this.material.uniforms.progress1.value },
        set(value) { this.material.uniforms.progress1.value = value }
      },
      progress2:
      {
        get() { return this.material.uniforms.progress2.value },
        set(value) { this.material.uniforms.progress2.value = value }
      },
      colorBlend: {
        get() { return this.material.uniforms.colorBlend.value },
        set(value) { this.material.uniforms.colorBlend.value = value }
      }
    })

    pixellateMixerRef.current = new THREE.AnimationMixer(node)
    pixellateClipRef.current = new THREE.AnimationClip('', 6, [
      progress1NKT, progress2NKT, colorBlendNKT
    ])
    pixellateRef.current = pixellateMixerRef.current.clipAction(pixellateClipRef.current)
    pixellateRef.current.setLoop(THREE.LoopOnce)
    pixellateRef.current.clampWhenFinished = true


    console.log(`backdropRef.current: `, backdropRef.current)
    console.log(`node: `, node)

  }, [])


  useEffect(() => {

    const node = meshRef.current
    console.log(`meshRef.current: `, meshRef.current)

    if (Object.hasOwn(node, 'map')) return

    Object.defineProperties(node, {
      map: {
        get() { return this.material[0].uniforms.map.value },
        set(value) {
          console.log(`this: `, this)
          this.material[0].uniforms.map.value = value
          // this.material[1].uniforms.map.value = value
        }
      },
      progress: {
        get() { return this.material[0].uniforms.progress.value },
        set(value) {
          this.material[0].uniforms.progress.value = value
          // this.material[1].uniforms.progress.value = value
        }
      },
      opacity: {
        get() { return this.material[0].uniforms.opacity.value },
        set(value) { this.material[0].uniforms.opacity.value = value }
      }
    })

    revealMixerRef.current = new THREE.AnimationMixer(meshRef.current)
    hideMixerRef.current = new THREE.AnimationMixer(meshRef.current)

    revealClipRef.current = new THREE.AnimationClip("reveal", 2.5, [new THREE.NumberKeyframeTrack(".opacity", [0, 0.5, 2.5], [0, 0, 1])
    ])
    const reveal = revealMixerRef.current.clipAction(revealClipRef.current)
    reveal.setLoop(THREE.LoopOnce)
    reveal.clampWhenFinished = true
    revealRef.current = reveal

    colorRippleClipRef.current = new THREE.AnimationClip('', 8, [new THREE.NumberKeyframeTrack(".progress", [0, 4, 8], [0.2, .8, .2])])

    colorRippleRef.current = revealMixerRef.current.clipAction(colorRippleClipRef.current)
    colorRippleRef.current.setLoop(THREE.LoopRepeat)

    hideClipRef.current = new THREE.AnimationClip("hide", 4, [new THREE.NumberKeyframeTrack(".opacity", [0, 2.1, 2.5], [1, 0, 0])])
    const hide = hideMixerRef.current.clipAction(hideClipRef.current)
    hide.setLoop(THREE.LoopOnce)
    hide.clampWhenFinished = true
    hideRef.current = hide

  }, [])


  useEffect(() => {

    const oldValue = oldMap.current

    backdropRef.current.material.uniforms.map1.value = maps.current[oldValue]
    backdropRef.current.material.uniforms.map2.value = maps.current[selectedFilmId]
    pixellateRef.current.reset().play()
    oldMap.current = selectedFilmId


    title = titles[selectedFilmId]
    meshRef.current.material[0].uniforms.titleColor.value = titleColors[selectedFilmId]

    hideRef.current.reset().play()

    revealRef.current.reset().play()
    colorRippleRef.current.reset().play()


  }, [selectedFilmId])


  useFrame((_, delta) => {
    if (revealMixerRef.current) revealMixerRef.current.update(delta)
    if (pixellateMixerRef.current) pixellateMixerRef.current.update(delta)

  })

  const { gl, camera } = useThree()
  const dpr = gl.getPixelRatio()

  camera.position.set(0, 0, 30)
  // camera.position.set(0, 0, 60)

  const rs = useMemo(() => reveal({ map: maps.current[selectedFilmId], titleColor: titleColors[selectedFilmId] }), [])
  const ps = useMemo(() => pixellate({ map1: maps.current[selectedFilmId], map2: maps.current[selectedFilmId] }), [])

  return (
    <group scale={new THREE.Vector3(1, 1, 1)} position={new THREE.Vector3(-9.5, 4.9, 0)}>
      <mesh scale={new THREE.Vector3(.03, .04 / (1280 / 720), 1)} position={new THREE.Vector3(0, 0, 0)} ref={backdropRef} renderOrder={0} >
        <planeGeometry attach='geometry' args={[1280 * dpr, 720 * dpr]} />
        <shaderMaterial attach='material' args={[ps]} />
      </mesh>
      <mesh position={new THREE.Vector3(-7, -12.3, 0)} scale={new THREE.Vector3(.06, .04, 1)} renderOrder={1}>
        <planeGeometry args={[1280, 200]} />
        <meshBasicMaterial args={[{ color: 0x000000 }]} transparent opacity={0.4} />
      </mesh>
      <Text3D position={new THREE.Vector3(-25, -13, 2)} scale={new THREE.Vector3(250, 250, 1)} font={'/Noto_Sans_Black_Regular.json'} {...{ size: .01, height: .01, bevelEnabled: false, bevelSegments: 0, steps: 0 }} ref={meshRef} renderOrder={2} >
        {title}
        <shaderMaterial attach='material-0' args={[rs]} transparent opacity={1} />
        <meshBasicMaterial attach='material-1' color={0xffffff} transparent opacity={0} />
      </Text3D>
    </group>
  )
}