'use client'
import { useRef, useEffect, Suspense, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

import { vec3 } from '@/lib/utils'

extend({ Text3D })

export default function Home() {

  // const [mainMenu, setMainMenu] = useState(null)

  const canvasRef = useRef(null)
  // const mainMenuRef = useRef(null)
  const cubeMapRef = useRef(null)
  const [cubeMap, setCubeMap] = useState(null)

  // const [cubeMap] = useLoader(THREE.CubeTextureLoader, [['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']])


  // const cubeMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], { path: '/' })

  useEffect(() => {

    if (!canvasRef.current) return
    if (typeof window !== 'undefined') {
      const { outerWidth, outerHeight } = window
      canvasRef.current.setAttribute('width', outerWidth)
      canvasRef.current.setAttribute('height', outerHeight)
    }

    setCubeMap(new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']))

    // cubeMapRef.current = new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'])

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black ">
      {/* <Suspense> */}
      <Canvas ref={canvasRef}>
        {cubeMap && <motion.group initial={{ x: 2, y: 2, z: 11, rotateY: 0, rotateX: -32 }} animate={{ x: -6.5, y: 0, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} style={{ transformOrigin: '50% 50%' }}>
          <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <motion.pointLight initial={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <Text3D position={vec3(3.75, 0.8, 0)} scale={vec3(0.5, 0.5, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.002} style={{ transformOrigin: 'center' }} >
            WELCOME TO
            <meshPhongMaterial envMap={cubeMap} emissive={0xee6666} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} />
            <meshPhongMaterial envMap={cubeMap} emissive={0xeecccc} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} />
          </Text3D>
        </motion.group>}
        {cubeMap && <motion.group initial={{ x: -6.5, y: 7, z: 5, rotateY: 13, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} animate={{ x: -6.5, y: 0, z: 0, rotateY: 0, rotateX: 0, originX: 0.5, originY: 0.5, originZ: 0 }} transition={{ duration: 5 }} style={{ originX: 0.5, originY: 0.5, originZ: 0 }} >
          <Text3D position={vec3(1.2, 0, 0)} scale={vec3(0.4, 0.6, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: '50% 50%' }} >
            DaleTristanHutchinson.com
            <motion.meshPhongMaterial envMap={cubeMap} emissive={444444} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} />
            <motion.meshPhongMaterial envMap={cubeMap} emissive={0x444444} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} />
          </Text3D>
        </motion.group>}
        {cubeMap && <motion.group position={vec3(0.2, -1.2, 0)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5, delay: 5 }}>
          <motion.pointLight initial={{ x: -1, y: 0, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 1, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <motion.pointLight initial={{ x: 1, y: 0, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -1, y: 2, z: 1, rotateY: 0, rotateX: 0, opacity: 1 }} transition={{ duration: 2, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <Text3D position={vec3(-1.5, 0, 0)} scale={vec3(0.5, 0.5, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: 'center' }}>
            ENTER
            <motion.meshPhongMaterial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5 }} envMap={cubeMap} emissive={0x0000ee} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} transparent />
            <motion.meshPhongMaterial initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 5 }} envMap={cubeMap} emissive={0x0000ee} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} transparent />
          </Text3D>
        </motion.group>}
      </Canvas>
      {/* </Suspense> */}
    </main>
  )
}



