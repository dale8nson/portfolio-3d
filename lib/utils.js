
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as THREE from 'three'

// import dynamic from 'next/dynamic'
// const THREE = dynamic(() => import('three'), { ssr: false })

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const vec2 = (n1, n2) => new THREE.Vector2(n1, n2)
export const vec3 = (n1, n2, n3) => new THREE.Vector3(n1, n2, n3)
export const vec4 = (n1, n2, n3, n4) => new THREE.Vector4(n1, n2, n3, n4)

// export const dynamic = 'force-dynamic'