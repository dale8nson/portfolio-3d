'use client'
import { useMemo } from 'react'
import { KeyboardControls } from '@react-three/drei'

export default function Layout ({children}) {


  const map = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'back', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ], [])

  return (
    <KeyboardControls map={map}>
      {children}
    </KeyboardControls>
  )
}