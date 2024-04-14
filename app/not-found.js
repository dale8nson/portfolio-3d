'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, usePathname } from "next/navigation"
import { NotFound } from '/components/NotFound'

export default function Page() {
  const router = useRouter()
  const isReady = router.isReady
  // const [path, setPath] = useState(null)

  const path = usePathname()

  useEffect(() => {
    // if (isReady) {
    //   setPath(router.asPath)
    // }
  }, [])
  return (
    <main>
      <div>
        {path && <NotFound id={path} />}
      </div>
    </main>
  )
}
