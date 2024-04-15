'use client'
import * as THREE from 'three'
import { extend, useThree, useLoader } from '@react-three/fiber'
import { Html, useGLTF, PerspectiveCamera, PointerLockControls, useTexture } from '@react-three/drei'
import { vec3 } from '/lib/utils'
import { HoverUI } from '/components/HoverUI'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

extend([Html, PerspectiveCamera])

export default function About() {

  const room = useGLTF('/the_great_drawing_room/scene.gltf')
  console.log('room: ', room)

  const parchment = useLoader(THREE.TextureLoader, '/parchment.png')

  return (
    <group position={vec3(0, 0, 0)} scale={vec3(1, 1, 1)}>
      <PerspectiveCamera makedefault position={vec3(0, 0, 40)} rotation={new THREE.Euler(0, 0, 0)} />
      <hemisphereLight />
      <primitive object={room.scene} position={vec3(-1.2, -1, 3)} scale={vec3(.5, .5, .5)} rotation={new THREE.Euler(0, -Math.PI / 1.4, 0)} />
      <HoverUI position={vec3(0, 0, 4.2)} scale={[0.25, .4, 1]} backgroundImage={parchment}>
        <div className='flex-col flex-col md:w-2/12 w-[13rem] mx-auto h-[12rem] align-middle justify-items-start relative  md:top-[0rem]'>
          <div className='flex-col  mx-auto align-middle justify-items-start overflow-y-scroll relative h-full  md:top-[0rem]'>
            <h1 className=' text-center font-[trattatello] text-[#33331199]'>ABOVT</h1>
            <p className='font-[trattatello] text-md'>lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! </p>
          </div>
          <div className='relative top-[2rem]'>
            <Link className='text-[#33331199] font-[trattatello] text-xl' href='/home'>BACK</Link>
          </div>
        </div>
      </HoverUI>
      <PointerLockControls />
    </group>
  )
}