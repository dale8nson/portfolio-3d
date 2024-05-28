'use client'

import StoreProvider from './components/StoreProvider'

export default function StoreLayout({ children }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}