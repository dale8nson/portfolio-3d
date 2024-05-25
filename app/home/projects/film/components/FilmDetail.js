import { useRef, useEffect } from 'react'
import styles from './FilmDetail.module.css'


const FilmDetail = ({ id, title, themeColor, titleColor, overview, poster_path, selectedFilmId }) => {

  // console.log(`fiilm id: ${id}`)

  const posterRef = useRef(null)
  const overviewRef = useRef(null)
  const overviewRef2 = useRef(null)
  const metaRef = useRef(null)
  const filmDetailRef = useRef(null)

  const previousThemeColor = useRef(null)

  const textColor = '#' + titleColor.map(col => col.toString(16).padStart(2, '0')).join('')

  // console.log(`titleColor: `, titleColor, `textColor: ${textColor}`)



  useEffect(() => {

    if (id === selectedFilmId) {

      overviewRef.current.classList.replace('blur-md', 'blur-none')
      overviewRef2.current.classList.replace('blur-md', 'blur-lg')
      metaRef.current.classList.add('!opacity-100')
      overviewRef.current.classList.remove('!translate-y-[30rem]')
      overviewRef2.current.classList.remove('!translate-y-[20rem]')

    } else {

      overviewRef.current.classList.replace('blur-none', 'blur-md')
      overviewRef2.current.classList.replace('blur-lg', 'blur-md')
      overviewRef.current.classList.add('!translate-y-[30rem]')
      overviewRef2.current.classList.add('!translate-y-[20rem]')
      // filmDetailRef.current.classList.remove('opacity-100');
      metaRef.current.classList.remove('!opacity-100');

    }

  }, [selectedFilmId])

  return (
    <div className={`transition-all opacity-0 absolute top-[35rem] duration-[1500ms]  w-full h-full `} ref={metaRef}>
      <img src={`https://image.tmdb.org/t/p/w780${poster_path}`} className={`${styles["film-detail-poster"]} relative z-30 transition-transform duration-[2000ms] `} alt={`${title} poster`} ref={posterRef} />
      <p className={`${styles["film-detail-overview"]} absolute top-[4rem] blur-md left-[4rem]  text-[${textColor}] transition-all w-9/12 z-10 duration-[1700ms] text-2xl !translate-y-[20rem]`} ref={overviewRef2} style={{ color: textColor }} >
        {overview}
      </p>
      <p className={`absolute blur-md top-[2rem] !translate-y-[30rem] text-white left-[1.5em] transition-all h-full z-20  w-9/12 duration-[1500ms] text-2xl`} ref={overviewRef} >
        {overview}
      </p>
    </div>
  )
}

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

export default FilmDetail
