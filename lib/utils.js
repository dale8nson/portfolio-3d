
import { useRef, useEffect, useState, useCallback} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


// import dynamic from 'next/dynamic'
// const THREE = dynamic(() => import('three'), { ssr: false })

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const vec2 = (n1, n2) => new THREE.Vector2(n1, n2)
export const vec3 = (n1, n2, n3) => new THREE.Vector3(n1, n2, n3)
export const vec4 = (n1, n2, n3, n4) => new THREE.Vector4(n1, n2, n3, n4)

// export const dynamic = 'force-dynamic'

export const useMixer = (node) => {
  
  const [mixer, setMixer] = useState(null)

  useEffect(() => {
    if(!node) return
    setMixer(new THREE.AnimationMixer(node))
  },[node])

  return {isLoading: !node ? true : false,  mixer: node ? mixer : null}
}

export const useClip = (duration, tracks) => {
  const [clip, setClip] = useState(null)
  useEffect(() => {
    setClip(new THREE.AnimationClip('', duration, tracks))
  }, [])
  return clip
}

export const useAction = (clip, mixer) => {
  const [action, setAction] = useState(null)
  useEffect(() => {
    setAction(mixer.clipAction(clip))
  },[])
  return action
}