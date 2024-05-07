'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { extend, useLoader, Canvas } from '@react-three/fiber'
import { Html, PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { vec3 } from '/lib/utils'
import { HoverUI } from '/components/HoverUI'
import Link from 'next/link'
import { DrawingRoom } from '/components/DrawingRoom'

extend([Html, PerspectiveCamera])

export default function About() {

  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const { outerWidth, outerHeight } = window

    canvasRef.current.style.width = `${outerWidth}px`
    canvasRef.current.style.height = `${outerHeight}px`
  })

  return (
    <Canvas ref={canvasRef} className='h-screen'>
      <group position={vec3(0, 0, 0)} scale={vec3(1, 1, 1)}>
        <PerspectiveCamera makedefault position={vec3(0, 0, 40)} rotation={new THREE.Euler(0, 0, 0)} />
        <hemisphereLight />
        <DrawingRoom />
        <HoverUI position={vec3(0, 0, 4)} scale={[0.35, .5, 1]} >
          <div className='flex-col md:w-2/12 w-[13rem] mx-auto h-[12rem] align-middle justify-items-start relative  md:top-[0rem]'>
            <div className='flex-col  mx-auto px-4 align-middle justify-items-start overflow-y-scroll relative h-full  md:top-[0rem] font-sans font-sm leading-4 text-xs'>
              <div className='fixed -top-7 left-[47%]'><h1 className='text-center text-2xl font-[trattatello] text-[#33331199]'>ABOUT</h1></div>
              <p>Hello, and welcome to my website. This was my final project submission as part of a <strong>React</strong> short course with General Assembly, completed on April 18, 2024.</p>
              <p>
                I've been slowly adding new features to it, but it is still very much under construction (hence my not-so-subtle hint on the landing page), so there are many things that are missing, as well as bugs. Please bare with me as I continue to work on it.
              </p>
              <p>
                Despite its many imperfections, I would like to highlight some of the technologies I have been incorporating (some for the first time) into this site.
              </p>
              <div className='indent-0'>
                <h1 className='font-bold font-[trattatello] text-xl'>Language</h1>
                <p><strong>Javascript</strong></p>
                <p> NB. For the course, the submissions had to be written in JS. However, I have been using <strong>Typescript</strong> in all my other projects.</p>
                <h1 className='font-bold text-xl font-[trattatello]'>Framework</h1>
                <p>
                  <strong>NextJS</strong> framework, using the new App router architecture.
                </p>
                <p>I also used <strong>Gatsby</strong> for a few months before I switched to Next</p>
                <h1 className='font-bold text-xl font-[trattatello]'><strong>UI</strong></h1>
                <p>Where I can, I am trying to use <strong>shadcn/ui</strong>, which is apparently what all the cool kids are using these days.  </p>
                <p>The menu on the home page uses shadcn (albeit stripped of all the default styling), as does the small data entry and table example. I'm hoping to create something more extended to showcase on this site in the near future. </p>
                <h1 className='font-bold text-xl font-[trattatello]'><strong>Style</strong></h1>
                <p><strong>TailwindCSS</strong></p>
                <h1 className='font-bold text-xl font-[trattatello] '>3D</h1>
                <p>
                  <strong>ThreeJS, React Three Fiber, React Three Drei, Blender3D, GLTF, FBX</strong>
                </p>
                <p>I have additionally written some simple shaders in <strong>GLSL</strong>, which will be demonstrated in other projects on this site in the near future.</p>
                <p>I love 3D graphics and animations, and I am looking to learn more about this area and how I might be able to use them in future projects. I can see that vector and matrix maths, and 3D graphics algorithms, will be on my study agenda in the near future...  </p>
                <h1 className='font-bold text-xl font-[trattatello]' ><strong>Frontend</strong></h1>
                <p>
                  <strong>React, TanStack Query</strong>
                </p>
                <h1 className='font-bold text-xl font-[trattatello]'>Backend</h1>
                <p>
                  <strong>MongoDB, GraphQL, Apollo Server </strong>
                </p>
                <p>I created my first GraphQL server in this project. It's a modest effort, but I recently started a project where I am creating a server that retrieves data from the ABS. Much trickier, but through it I am cutting my teeth and discovering what the routine coding patterns are for serving GraphQL queries.</p>
              </div>
              <h1 className='font-bold text-xl font-[trattatello]'>Conclusion</h1>
              <p>
                I hope that you can see that I thrive on trying new technologies and opportunities to create, problem-solve, and acquire new knowledge and skills. In terms of applications, I'm eager to get my feet wet in all sorts of domains, whether they are for commerce, education, government, data science, or entertainment.
              </p>
              <p>I aspire to make attractive, functional websites and web apps, and to that end I am also keen to learn more about web design, and what it takes to create a polished, professional product.</p>
            </div>
            <div className='relative top-[2rem]'>
              <Link className='text-[#33331199] font-[trattatello] text-xl' href='/home'>BACK</Link>
            </div>
          </div>
        </HoverUI>
        <PointerLockControls />
      </group>
    </Canvas>
  )
}