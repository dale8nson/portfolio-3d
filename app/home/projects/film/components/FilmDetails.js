import { useRef, forwardRef, useEffect, useState, useCallback, useMemo, Suspense } from 'react'
import styles from './FilmDetail.module.css'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Reveal } from './Reveal'
import FilmDetail from './FilmDetail'

const FilmDetails = forwardRef(function FilmDetails({ films, className, visible, localUrl, selectedFilmId, firstFilmSelected }, ref) {

  const backdropRef = useRef(null)
  const filmDetailRef = useRef({})

  const initRef = useCallback(node => {
    if (!(node && ref?.current)) return
    if (typeof ref === 'function') ref(node)
    else ref.current = node
    // filmDetailRef.current = node

  }, [])

  // console.log(`films: `, films)
  const titleColors = Object.fromEntries(films.map(film => [film.id, film.titleColor]))

  let titleColor = null, textColor = null



  if (selectedFilmId) {
    titleColor = titleColors[selectedFilmId]
    textColor = '#' + titleColor.map(col => col.toString(16).padStart(2, '0')).join('')
  }

  return (
    <div className={`${styles['FilmDetail']} ${styles['is-hydrated']} ${className || ''}  absolute overflow-x-hidden top-0 w-full h-[100vh] left-0 transition-all duration-[1500ms]`} ref={initRef} >
      <figure className={`absolute top-0 left-0 z-0 w-[1280px] h-[720px]  translate-y-[0rem] duration-[1000ms] delay-1000`} ref={backdropRef} >
        <Suspense fallback={<div><h1>LOADING...</h1></div>} >
          {selectedFilmId && localUrl && <Canvas className={`absolute top-0 left-0 z-20`} >
            <directionalLight position={new THREE.Vector3(-40, 0, 10)} args={[0xffffff, 1.2]} castShadow={false} />
            <directionalLight position={new THREE.Vector3(40, 0, 10)} args={[0xffffff, 1.2]} castShadow={false} />
            {localUrl && <Reveal {...{ localUrl, visible, films, selectedFilmId }} />}
          </Canvas>}
        </Suspense>
      </figure>
      {selectedFilmId && films.map(film => {
        return <FilmDetail {...{ ...film, selectedFilmId }} />
      })}
    </div>
  )
})

function FilmDetailEmpty() {
  return (
    <div className={styles["FilmDetail"]}>
      <p>
        <i className={styles["material-icons"]}>subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export default FilmDetails



// bg-[image('https://image.tmdb.org/t/p/w1280${backdrop_path}#xywh=65,25,50,50')]