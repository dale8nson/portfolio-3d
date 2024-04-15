'use client'
import { useVideoTexture } from '@react-three/drei'
import { vec3 } from '@/lib/utils'

export const VideoBackdrop = ({ url }) => {
  const videoBackdrop = useVideoTexture(url)

  return (
    <mesh scale={vec3(20,20,1)} position={vec3(0,0,0)}>
      <planeGeometry args={[1, 1]} />
      <meshPhongMaterial map={videoBackdrop}  />
    </mesh>
  )
}