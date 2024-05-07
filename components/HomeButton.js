import { useRef, useEffect} from 'react'
import * as THREE from 'three'
import { Container, Root, Content } from '@react-three/uikit'
import { useFBX, useCubeTexture, Outlines, Html } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Button } from '/components/uikit/default/button'
import { motion } from 'framer-motion-3d'
import { animate, motionValue } from 'framer-motion'
import { useStore } from '/lib/store'
import { RouterContext } from '/components/RouterContext'


extend([Outlines, Html])

export const HomeButton = ({ onClick }) => {
  // const { router } = useStore(state =>  state.router)
  // router.prefetch('/home')

  const rootRef = useRef(null)

  const homeButton = useFBX('/home.fbx')
  console.log('homeButton: ', homeButton)
  const envMap = useCubeTexture(['sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png', 'sky.png'], { path: '/' })
  envMap.anisotropy = 0
  envMap.wrapT = envMap.wrapS = THREE.RepeatWrapping
  envMap.mapping = THREE.CubeReflectionMapping
  const { material: mat } = homeButton.children[0]
  mat.envMap = envMap
  mat.refractionRatio = 0.1
  mat.emissive = new THREE.Color(16, 16, 0)
  // mat.color = new THREE.Color(16, 16, 0)

  mat.emissiveIntensity = 0.0000625
  // mat.specular = new THREE.Color(255, 227, 188)
  mat.specular = new THREE.Color(32, 32, 0)
  mat.reflectivity = 0.5
  mat.shininess = 25
  mat.side = THREE.DoubleSide

  useEffect(() => {
    if(!rootRef.current) return
    console.log('rootRef.current: ', rootRef.current)
  })

  return (
    <motion.group position={[1.2, -0.47, 4]}>
    <Root ref={rootRef}>
      <Button onClick={onClick} >
        <Content >
          <motion.group  whileHover={{ rotateY: -Math.PI / 100 * 25 }} transition={{ duration: 0.5 }}  >
            <motion.primitive object={homeButton} scale={[.02125, .02125, .02125]} position={[0, 0, 0]} envMap={envMap} rotation={new THREE.Euler(0.035, -Math.PI / 100 * 20, 0.23)} >
              <Outlines color={[16, 16, 0]} thickness={1} />
            </motion.primitive>
          </motion.group>
        </Content>
      </Button>
    </Root>
    </motion.group>
  )
}