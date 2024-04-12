'use client'
import { StoreProvider } from '@/lib/store'
import './globals.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {


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
