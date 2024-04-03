'use client'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { Html, Text3D, useCubeTexture } from '@react-three/drei'
import { vec3 } from '@/lib/utils'

export default function Home() {

  const [mainMenu, setMainMenu ] = useState(null)

  const canvasRef = useRef(null)
  const mainMenuRef = useRef(null)

  const cubeMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], {path:'/'})

  useEffect(() => {
    if(!canvasRef.current) return
    const { innerWidth, innerHeight } = window
    canvasRef.current.setAttribute('width', innerWidth)
    canvasRef.current.setAttribute('height', innerHeight)

    setMainMenu(mainMenuRef.current)

  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black ">
      <Canvas ref={canvasRef}>
        {/* <ambientLight color={0xffffff} /> */}
        <directionalLight position={vec3(-5, 5, 10)} />
        <pointLight position={vec3(-3.5, 2, 1)} />
         <mesh className='main' ref={mainMenuRef} position={vec3(0, 0, 0)} scale={vec3(1, 1, 1)}>
          <planeGeometry args={[16, 10]} />
          <meshBasicMaterial color={0x000000} />
          <Html wrapperClass='main' distanceFactor={10} portal={mainMenu} transform>
          <div className='flex-col align-middle text-[#ee0000]'>
            {/* <h1>WELCOME</h1> */}
          </div>
        </Html>
        </mesh>
        <Text3D position={vec3(-3.5, 0, 0)} font='/Kastellar_Regular.json' bevelEnabled bevelSegments={5} bevelSize={.0005} bevelThickness={0.001}>
          WELCOME
          <meshPhongMaterial envMap={cubeMap} attach='material-0' color={0xffffff} shininess={100} />
          <meshPhongMaterial envMap={cubeMap} attach='material-1' color={0xffffff} shininess={100} />
        </Text3D>
      </Canvas>
     </main>
  );
}
