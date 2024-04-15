'use client'
import { useVideoTexture } from '@react-three/drei'
import { vec3 } from '/lib/utils'


export const VideoMesh = ({ url, ...props }) => {

  const video = useVideoTexture(url, {muted:true, loop:true})

  return (
    <mesh position={vec3(-3.1)} {...{...props}}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial map={video} />
    </mesh>
  )
}