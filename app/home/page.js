'use client'
import { useEffect, useRef, useMemo } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { useFBX, useGLTF, KeyboardControls } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ShowRoom } from '/components/ShowRoom'
import { RouterProvider } from '/components/RouterProvider'

extend([KeyboardControls])

export default function Home() {

  // useFBX.preload('/resume/resume3.fbx')
  useFBX.preload('/projector/uploads_files_2181451_projector3d_cgtrader.fbx')
  useGLTF.preload('/home-icon.glb')
  useGLTF.preload('/the_great_drawing_room/scene.gltf')

  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`
  })

  const map = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'back', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ], [])

  return (
    <RouterProvider>
      <KeyboardControls map={map}>
        <Canvas ref={canvasRef} className='h-screen'>
          <ShowRoom>
            <main>
              <div className='mx-auto my-0 align-items-middle p-1 w-5/12 text-xs rounded-sm border border-solid border-[#338833] h-[17vh] font-[led] flex-col align-middle text-[#338833] bg-[#336633] backdrop-blur-sm bg-opacity-50 leading-2'>
                <h1 className='text-center'>WELCOME</h1>
                <Button className='bg-transparent h-2 mx-auto my-0 p-2 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
                  <Link href='/home/about'>About</Link>
                </Button>
                <Button className='bg-transparent h-2 p-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] align-items-center transition-color duration-500' >
                  <Link href='/home/resume' >Resume </Link>
                </Button>
                <Button className='bg-transparent p-2 h-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
                  Projects
                </Button>
                <Button className='bg-transparent p-2 h-2 mx-auto my-0 font-[nasalization] text-[#338833] hover:bg-[#33aa33] hover:bg-opacity-50 hover:text-[#33cc33] transition-color duration-500' >
                  Contact
                </Button>
              </div>
            </main>
          </ShowRoom>
        </Canvas>
      </KeyboardControls>
    </RouterProvider>
  )
}
