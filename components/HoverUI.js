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

export const HoverUI = forwardRef(function HoverUI({ children, ...props }, ref) {

  const htmlRef = useRef(null)

  const map = useTexture('/sh_bk.png')
  map.wrapS = map.wrapT = THREE.RepeatWrapping

  const nebula = useGLTF('/free_-_skybox_space_nebula/scene.gltf')

  const { fragmentShader, vertexShader, uniforms } = FilmShader
  console.log('uniforms: ', uniforms)
  uniforms.tDiffuse.value = map
  // uniforms.color.value = 0x0000aa
  // uniforms.time.value = 0.1
  // uniforms.tDudv.value = 0.5
  // uniforms.textureMatrix.value = new THREE.Matrix4([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  // uniforms.resolution.value = vec2(512, 512)
  // uniforms.byp.value = 0.5

  const { phong } = ShaderLib
  phong.uniforms.emissive = 0xee0000
  phong.uniforms.color = 0xee0000
  phong.uniforms.side = THREE.DoubleSide

  const material = createElement('shaderMaterial', { args: [phong] })

  useEffect(() => {
    console.log('CubeUI useEffect')
    // if (!htmlRef.current) return
    if (!ref?.current) return
    console.log(`ref.current: `, ref.current)
    console.log(`htmlRef.current: `, htmlRef.current)
  }, [])

  return (
    <motion.group {...{ ...props }} ref={ref ?? null} >
      <motion.mesh name={props.name} position={vec3(0, 0, 0)} scale={vec3(4,8,1)}  >
        <planeGeometry args={[1, 1, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} wireframe />
        <Html
          occlude
          transform
          position={vec3(0, 0, 0.1)}
          scale={0.1}
          // material={material}
        // ref={htmlRef}
        >
          {children}
        </Html>
      </motion.mesh>
    </motion.group>
  )
})

// {/* <MeshReflectorMaterial
// blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
// mixBlur={0} // How much blur mixes with surface roughness (default = 1)
// mixStrength={1} // Strength of the reflections
// mixContrast={1} // Contrast of the reflections
// resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
// mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
// depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
// minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
// maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
// depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
// distortion={0} // Amount of distortion based on the distortionMap texture
// // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
// debug={0} /* Depending on the assigned value, one of the following channels is shown:
// 0 = no debug
// 1 = depth channel
// 2 = base channel
// 3 = distortion channel
// 4 = lod channel (based on the roughness)
// */
// reflectorOffset={0.5} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
// transparent
// opacity={0.95}
// color={0x338833}
// emissive={0x338833}
// metalness={.1}
// roughness={0}
// /> */}