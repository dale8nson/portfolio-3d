'use client'
import { useState, useEffect } from "react";
import FilmLibrary from "./components/FilmLibrary";

export default function Home() {

  const [localUrl, setLocalUrl] = useState(null)

  useEffect(() => {
    setLocalUrl(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`)
  }, [])

  return (
    <main className=''>
      {localUrl && <FilmLibrary localUrl={localUrl} />}
    </main>
  );
}
