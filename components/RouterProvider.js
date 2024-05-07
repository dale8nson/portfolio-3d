import { createContext } from 'react'
import { RouterContext } from '/components/RouterContext'
import { useRouter } from 'next/navigation'

export const RouterProvider = ({ children }) => {
  const router = useRouter()
  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>
  )
}