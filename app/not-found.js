'use client'
import {usePathname } from "next/navigation"
import { NotFound } from '/components/NotFound'

export default function Page() {
  const path = usePathname()
  return (
    <main>
      <div>
        {path && <NotFound id={path} />}
      </div>
    </main>
  )
}
