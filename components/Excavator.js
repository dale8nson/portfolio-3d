import { useFBX } from '@react-three/drei'

export const Excavator = (position) => {
   const excavator = useFBX('/excavator/excavator.fbx')

   return (
    <primitive object={excavator} position={position} scale={3} />
   )
}