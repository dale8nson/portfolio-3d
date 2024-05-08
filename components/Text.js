'use client'
import { useEffect, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Text3D, useCubeTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { vec3 } from '@/lib/utils';


export const Text = forwardRef(function Text({ children, initial, animate, transition, position = vec3(0, 0, 0), scale = vec3(1, 1, 1), font ='/Itai Protests_Regular.json', rotation = new THREE.Euler(0, 0, 0), color = 0xeebb00, shininess = 100, refractionRatio = 1, emissive = 0xeebb00 }, ref) {

  const envMap = useCubeTexture(['sh_rt.png', 'sh_lf.png', 'sh_up.png', 'sh_dn.png', 'sh_bk.png', 'sh_ft.png'], {path:'/'})

  const initTextNode = node => {
    if (!node) return;
    node.geometry.computeBoundingBox();
    node.geometry.center();
  };

  useEffect(() => {
    if(!ref?.current) return
    ref.current.mixer = new THREE.AnimationMixer(ref.current)
  }, [])

  useFrame((_, delta) => {
    if(ref?.current?.mixer) ref.current.mixer.update(delta)
  })

  return <motion.group {...{ initial, animate, transition, position, scale, rotation }} style={{ transformOrigin: '50% 50%' }} ref={ref}>
    <Text3D font={font} bevelEnabled bevelSegments={10} bevelSize={0.0005} bevelThickness={0.004} style={{ transformOrigin: 'center' }} ref={initTextNode}>
      {children}
      <meshPhongMaterial {...{ envMap, emissive, color, shininess, refractionRatio }} attach='material-0' />
      <meshPhongMaterial {...{ envMap, emissive, color, shininess, refractionRatio }} attach='material-1' />
    </Text3D>
  </motion.group>;
}
)