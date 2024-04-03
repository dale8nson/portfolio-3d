'use client'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend } from "@react-three/fiber"
import { Html, Text3D, useCubeTexture } from '@react-three/drei'
import { motion } from 'framer-motion-3d'

import { vec3 } from '@/lib/utils'

extend({ Text3D })

export default function Home() {

  const [mainMenu, setMainMenu] = useState(null)

  const canvasRef = useRef(null)
  const mainMenuRef = useRef(null)

  const cubeMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], { path: '/' })

  useEffect(() => {
    if (!canvasRef.current) return
    const { innerWidth, innerHeight } = window
    canvasRef.current.setAttribute('width', innerWidth)
    canvasRef.current.setAttribute('height', innerHeight)

    setMainMenu(mainMenuRef.current)

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black ">
      <Canvas ref={canvasRef}>
        {/* <ambientLight color={0xffffff} /> */}
        {/* <motion.directionalLight initial={{x: -5, y: 5, z:10}} animate={{x:5, y:5, z:10}} transition={{duration:5, repeatType:'mirror', repeat:Infinity}}/> */}
        {/* <motion.spotLight initial={{x: -3.5, y: 2, z:1, rotateY:-5, rotateX:-20}} animate={{x:3.5, y:-2, z:1, rotateY:5, rotateX:20}} transition={{duration:5, repeatType:'mirror', repeat:Infinity}} intensity={3} /> */}
        {/* <motion.pointLight initial={{x: 3.5, y: -2, z:1, rotateY:5, rotateX:20}} animate={{x:-3.5, y:2, z:1, rotateY:-5, rotateX:-20}} transition={{duration:5, repeatType:'mirror', repeat:Infinity}} intensity={3} /> */}
        {/* <motion.pointLight initial={{x: -3.5, y: 2, z:1, rotateY:-5, rotateX:-20}} animate={{x:3.5, y:-2, z:1, rotateY:5, rotateX:20}} transition={{duration:5, repeatType:'mirror', repeat:Infinity}} intensity={3} /> */}
        {/* <motion.pointLight initial={{x: -4.5, y: 0, z:1, rotateY:0, rotateX:0}} animate={{x:4.5, y:0, z:1, rotateY:0, rotateX:0}} transition={{duration:5, repeatType:'mirror', repeat:Infinity}} intensity={3} /> */}
        {/* <mesh className='main' ref={mainMenuRef} position={vec3(0, 0, 0)} scale={vec3(1, 1, 1)}> */}
        {/* <planeGeometry args={[16, 10]} /> */}
        {/* <meshBasicMaterial color={0x000000} /> */}
        {/* <Html wrapperClass='main' distanceFactor={10} portal={mainMenu} transform> */}
        {/* <div className='flex-col align-middle text-[#ee0000]'> */}
        {/* <h1>WELCOME</h1> */}
        {/* </div> */}
        {/* </Html> */}
        {/* </mesh> */}
        <motion.group initial={{ x: 0, y: 7, z: 5, rotateY: 3, rotateX: 4 }} animate={{ x: -6.5, y: 0, z: 0, rotateY: 0, rotateX: 0 }} transition={{ duration: 5 }} style={{ transformOrigin: 'center' }}>
          <motion.pointLight initial={{ x: -5.5, y: -2, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <motion.pointLight initial={{ x: 13, y: 0, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: -5.5, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <Text3D position={vec3(3.75, 0.8, 0)} scale={vec3(0.5, 0.5, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.002} >
            WELCOME TO
            <meshPhongMaterial envMap={cubeMap} emissive={0xee6666} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} />
            <meshPhongMaterial envMap={cubeMap} emissive={0xeecccc} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} />
          </Text3D>
          <Text3D position={vec3(0, 0, 0)} scale={vec3(0.5, 0.7, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: 'center' }}>
            DaleTristanHutchinson.COM
            <meshPhongMaterial envMap={cubeMap} emissive={444444} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} />
            <meshPhongMaterial envMap={cubeMap} emissive={0x444444} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} />
          </Text3D>
        </motion.group>
        <motion.group position={vec3(0, -1.2, 0)} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:5, delay:5}}>
          <motion.pointLight initial={{ x: -1, y: 0, z: 1, rotateY: 0, rotateX: 0 }} animate={{ x: 1, y: 0, z: 1, rotateY: 0, rotateX: 0 }} transition={{ duration: 5, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <motion.pointLight initial={{ x: 1, y: 0, z: 1, rotateY: 0, rotateX: 0}} animate={{ x: -1, y: 2, z: 1, rotateY: 0, rotateX: 0, opacity:1 }} transition={{ duration: 2, repeatType: 'mirror', repeat: Infinity }} intensity={3} />
          <Text3D position={vec3(-1.5, 0, 0)} scale={vec3(0.5, 0.5, 1)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={10} bevelSize={.0005} bevelThickness={0.004} style={{ transformOrigin: 'center' }}>
            ENTER
            <motion.meshPhongMaterial initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2, delay:5}} envMap={cubeMap} emissive={0x0000ee} attach='material-0' color={0xffffff} shininess={100} refractionRatio={1} transparent />
            <motion.meshPhongMaterial initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2, delay:5}} envMap={cubeMap} emissive={0x0000ee} attach='material-1' color={0xffffff} shininess={100} refractionRatio={1} transparent />
          </Text3D>
        </motion.group>
      </Canvas>
    </main>
  );
}
