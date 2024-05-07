'use client'
<<<<<<< HEAD
import { useEffect } from 'react'
=======
import { useState, useEffect, useRef, useMemo } from 'react'
>>>>>>> 2a354330e169373ce427c20047f284b79f7e3f27
import { useRouter, usePathname } from "next/navigation"
import { NotFound } from '/components/NotFound'

export default function Page() {
  const router = useRouter()
<<<<<<< HEAD
=======
  const isReady = router.isReady
>>>>>>> 2a354330e169373ce427c20047f284b79f7e3f27
  // const [path, setPath] = useState(null)

  const path = usePathname()

<<<<<<< HEAD
=======
  useEffect(() => {
    // if (isReady) {
    //   setPath(router.asPath)
    // }
  }, [])
>>>>>>> 2a354330e169373ce427c20047f284b79f7e3f27
  return (
    <main>
      <div>
        {path && <NotFound id={path} />}
      </div>
    </main>
  )
}
