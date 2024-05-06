'use client'
import { useFBX } from '@react-three/drei'

export const Excavator = (position) => {
   const excavator = useFBX('/excavator/excavator.fbx')

   return (
    <group position={position}>
    <primitive object={excavator}  scale={.03} wireframe color={0xee0000} />
    <pointLight position={[0,0,0.2]} />
    </group>
   )
}