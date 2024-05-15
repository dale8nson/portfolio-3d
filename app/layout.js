'use client'
import { useGLTF } from '@react-three/drei'
import { StoreProvider } from '@/lib/store'
import './globals.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  useGLTF.preload('/modern_themed_show_room_updated/scene.gltf')
  useGLTF.preload('/free_-_skybox_space_nebula/scene.gltf')

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <body className='fixed w-screen h-screen m-0 bg-black'>{children}</body>
        </StoreProvider>
      </QueryClientProvider>
    </html>
  )
}
