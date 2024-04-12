import { useRef } from 'react'

import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { Html, MeshWobbleMaterial, MeshReflectorMaterial, Outlines, Edges, Trail, useGLTF, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import { vec3 } from '/lib/utils'
import { DigitalGlitch } from 'three-stdlib'
import { BaseShaderComponent} from './BaseShaderComponent'

extend([Html, MeshWobbleMaterial, MeshReflectorMaterial, Edges, Trail, Outlines, BaseShaderComponent])

export const CubeUI = () => {

  const ref = useRef(null)

  const tDiffuse = useTexture('/sh_bk.png')
  tDiffuse.wrapS = tDiffuse.wrapT = THREE.RepeatWrapping

  const nebula = useGLTF('/free_-_skybox_space_nebula/scene.gltf')

  const {fragmentShader, vertexShader, uniforms } = DigitalGlitch
  uniforms.tDiffuse.value = tDiffuse
  // uniforms.byp.value = 0.5

  return (
    <motion.group  position={vec3(0, 0.75, 0.51)}  scale={0.45} initial={{ y: 0.77 }} animate={{ y: 0.73 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}>
      {/* <BaseShaderComponent 
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        scale={1}
        position={vec3(0, 0, 0)}
        geometry={<sphereGeometry args={[20, 20, 20]} />}
        ref={ref}
       /> */}
      {/* <motion.mesh position={vec3(0, 0.75, 2.5)} scale={0.55} initial={{ y: 0.77 }} animate={{ y: 0.73 }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} > */}
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <shaderMaterial args={[DigitalGlitch]} /> */}
        {/* <meshPhongMaterial color={0x338833} transparent opacity={0.8} emissive={0x338833} refractionRatio={1} side={THREE.DoubleSide} /> */}
        {/* <MeshWobbleMaterial factor={1} speed={10} /> */}
        {/* <Outlines
          linewidth={7}
          scale={1}
          threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color={0x336633}
        /> */}
      {/* </motion.mesh> */}
      {/* // <Html transform position={vec3(0, 0, 0)} scale={1} > */}
        {/* // <div className='m-0 p-1 text-xs rounded-sm border border-solid border-[#338833] h-[15vh] font-[led] flex-col justify-start text-[#335533] bg-[#336633] backdrop-blur-sm bg-opacity-50'> */}
          {/* <h1>WELCOME</h1> */}
        {/* // </div> */}
      {/* // </Html> */}
    </motion.group>
  )
}




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