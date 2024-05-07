'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation"
import { NotFound } from '/components/NotFound'

export default function Page() {
  const router = useRouter()
  // const [path, setPath] = useState(null)

  const path = usePathname()

  return (
    <main>
      <div>
        {path && <NotFound id={path} />}
      </div>
    </main>
  )
}
