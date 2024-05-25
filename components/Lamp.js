import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useFBX } from '@react-three/drei'

export const Lamp = ({position}) => {
  const lamp = useFBX('/lamp.fbx')
  const mixer = useRef()
  const ref = useRef(null)
  const action = useRef()

  useEffect(() => {
    if(!ref.current) return
    mixer.current = new THREE.AnimationMixer(ref.current)
    action.current = mixer.current.clipAction(lamp.animations[0])
    action.current.setLoop(THREE.LoopRepeat)
    action.current.repetitions = Infinity
    // action.current.setDuration(10)
    // console.log('action.current: ', action.current)
    action.current.play()
    // console.log('ref.current: ', ref.current)
    mixer.current.addEventListener('finished', () => // console.log('lamp animation finished'))
  })
 
  useFrame((_, delta) => {
    if(mixer.current) {
      mixer.current.update(delta)

    }
  })

  return ( 
  <primitive object={lamp} position={position} scale={0.0001} ref={ref} />
)
}