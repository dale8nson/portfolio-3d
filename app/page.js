<<<<<<< Updated upstream
import Image from "next/image";
=======
'use client'
import { useRef, useEffect, useState, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { GLButton } from '@/components/GLButton'
import { DoubleDoors } from '@/components/DoubleDoors'
import { EntryCamera } from '/components/EntryCamera'
import { Text } from '/components/Text'
import { vec3 } from '@/lib/utils'
import { VideoMesh } from '/components/VideoMesh'
import { useStore } from '/lib/store'
import { Warning } from '/components/Warning'
import { Fence } from '/components/Fence'
import { Excavator} from '/components/Excavator'


export default function Entrance() {
  
  const canvasRef = useRef(null)
  const camRef = useRef(null)
  const pixelBoxRef = useRef(null)
  const doubleDoorRef = useRef(null)
  const lightFlareRef = useRef(null)
  const lightFlareClip = useRef(null)
  const lightFlareAction = useRef(null)
  const animRefs = useRef(null)
  const fenceAnim = useRef(null)

  let envMap, worldMap

  const [envMapState, setEnvMapState] = useState(null);
  envMap = envMapState;
  const [worldMapState, setWorldMapState] = useState(null);
  const [mixer, setMixer] = useState(null)

  worldMap = worldMapState

  useEffect(() => {

    if (!canvasRef.current) return
    console.log('canvasRef.current: ', canvasRef.current)

    console.log('pixelBoxRef.current: ', pixelBoxRef.current)
    if (typeof window !== 'undefined') {
      const { outerWidth, outerHeight } = window;
      canvasRef.current.setAttribute('width', outerWidth)
      canvasRef.current.setAttribute('height', outerHeight)
    }

    setWorldMapState(new THREE.CubeTextureLoader().setPath('/').load(['Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png', 'Texturelabs_Atmosphere_133L.png']))

    setEnvMapState(new THREE.CubeTextureLoader().setPath('/').load(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png']))

  }, [])

  useEffect(() => {
    if (!mixer) return

    const lightFlareTrack = new THREE.NumberKeyframeTrack('.progress', [0, 0.5, 6], [0, 0.6, 1])
    const lightFlareMoveTrack = new THREE.NumberKeyframeTrack('.position[z]', [0, 6], [-3.5, -2.5])
    lightFlareClip.current = new THREE.AnimationClip('', 6, [lightFlareTrack, lightFlareMoveTrack])
    lightFlareAction.current = mixer.clipAction(lightFlareClip.current)
    lightFlareAction.current.setLoop(THREE.LoopOnce)
    lightFlareAction.current.clampWhenFinished = true

    mixer.addEventListener('finished', () => router.push('/home'))

  }, [mixer])

  const onFinished = () => router.push('/home')

  const onClick = () => {
    doubleDoorRef.current.open()
    camRef.current.play()
    console.log('cameRef.current: ', camRef.current)
    if(animRefs.current) {
      console.log('animRefs.current: ', animRefs.current)
      for (const anim of animRefs.current) {
        anim.clampWhenFinished = true
        anim.setLoop(THREE.LoopOnce)
        setTimeout(() => {
          anim.startAt(0).reset().play()
          fenceAnim.current.startAt(0).reset().play()
        }, 3000)
      }
    }
  }

  if (envMapState && worldMapState) {
    envMapState.mapping = THREE.CubeReflectionMapping;
    worldMapState.mapping = THREE.CubeRefractionMapping;
  }

  const centreNode = node => {
    if (!node) return;
    node.geometry.computeBoundingBox()
    node.geometry.center()
  }
>>>>>>> Stashed changes

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
