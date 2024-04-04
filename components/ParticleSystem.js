import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import System, {
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  Velocity,
  PointZone,
  Vector3D,
  Alpha,
  Scale,
  Color,
  SpriteRenderer,
  RadialVelocity,
} from 'three-nebula'
export const ParticleSystem = () => {
  const { gl, scene } = useThree()
  const system = new System()
  const emitter = new Emitter()
  const renderer = new SpriteRenderer(scene, THREE)

  emitter
    .setRate(new Rate(new Span(4, 16), new Span(0.01)))
    .setInitializers([
      new Position(new PointZone(0, 0, 0)),
      new Mass(1),
      new Radius(6, 12),
      new Life(3),
      new RadialVelocity(45, new Vector3D(0, 1, 0), 180)
    ])
    .setBehaviours([
      new Color(new THREE.Color(0xee0000), new THREE.Color(0x0000ee))
    ])

  useEffect(() => {
    system.addEmitter(emitter).addRenderer(renderer).emit(() => null, () => null, () => null)
  })

  return (
    <>
    </>
  )
}