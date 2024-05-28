import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import TMDB from "../TMDB";
import FilmDetails from "./FilmDetails";
import FilmRow from "./FilmRow";
import styles from './FilmLibrary.module.css'
import { Tab } from "./Tab";



function FilmLibrary({ localUrl }) {

  const { films } = TMDB

  const [favourites, setFavourites] = useState([])
  const [selectedFilmId, setSelectedFilmId] = useState(null)
  const [visible, setVisible] = useState(Object.fromEntries(TMDB.films.map(film => [film.id, false])))
  const [selectedTab, setSelectedTab] = useState('all')

  const titleColors = Object.fromEntries(TMDB.films.map(film => ([film.id, film.titleColor])))

  const rgbArrayToHex = (arr) => arr.map(col => col.toString(16).padStart(2, '0')).join('')

  const [themeColor, setThemeColor] = useState(selectedFilmId ? rgbArrayToHex(titleColors?.[selectedFilmId]) : null)

  const secondaryColors = Object.fromEntries(TMDB.films.map(film => ([film.id, film.secondaryColor])))

  const [secondaryThemeColor, setSecondaryThemeColor] = useState(selectedFilmId ? rgbArrayToHex(secondaryColors?.[selectedFilmId]) : null)

  // console.log(`secondaryThemeColor: `, secondaryThemeColor)

  const filmDetailRefs = useRef({})
  const [firstFilmSelected, setFirstFilmSelected] = useState(false)

  const filmDetailsRef = useRef(null)

  const initRef = useCallback((node, id) => {
    if (!node) return
    filmDetailRefs.current[id] = node
  }, [])

  const addToFavourites = id => setFavourites([...favourites, id])
  const removeFromFavourites = id => setFavourites([...favourites.filter(filmId => filmId !== id)])

  const allTabRef = useRef(null)
  const faveTabRef = useRef(null)

  const filmRows = useMemo(() => films.map(film => {
    const { id, title, overview, poster_path, backdrop_path, release_date } = film
    const favourite = favourites.includes(id)
    const visible = selectedTab === 'all' || favourite

    return (
      <>
        {visible && <FilmRow key={id} {...{ id, selectedFilmId, title, overview, release_date, poster_path, themeColor, secondaryThemeColor, backdrop_path, onClick: () => onClick(id), addToFavourites, removeFromFavourites, selected: selectedFilmId === id, visible: selectedTab === 'all' || favourite, favourite }} />}
      </>
    )

  }), [themeColor, selectedTab, favourites])


  const onClick = id => {

    let newVisible = {}
    if (selectedFilmId) {
      // filmDetailRefs.current[selectedFilmId].classList.replace(styles.visible, styles.hidden)
      newVisible = { ...visible, [selectedFilmId]: false, [id]: true }
    } else newVisible = { ...visible, [id]: true }
    setVisible(newVisible)
    setFirstFilmSelected(true)
    setSelectedFilmId(id)

    // filmDetailRefs.current[id].classList.replace(styles.hidden, styles.visible)
    // filmDetailRefs.current[selectedFilmId]?.classList.replace(styles.visible, styles.hidden)

    // console.log(`selectedFilmId: `, selectedFilmId)

  }

  useEffect(() => {
    if (!filmDetailsRef.current) return
    filmDetailsRef.current.focus()
  }, [])

  useEffect(() => {

    const newThemeColor = selectedFilmId ? rgbArrayToHex(titleColors?.[selectedFilmId]) : null
    // console.log(`new theme color: ${newThemeColor}`)
    setThemeColor(newThemeColor)
    setSecondaryThemeColor(selectedFilmId ? rgbArrayToHex(secondaryColors?.[selectedFilmId]) : null)
  }, [selectedFilmId, selectedTab, favourites])

  return (
    <div className={`${styles.FilmLibrary} transition-colors duration-[1500ms]`}  >
      <div className={`${styles["film-list"]} transition-colors duration-[1500ms]`} style={{ backgroundImage: `linear-gradient(to bottom, #${themeColor || 'bbbbbb'}ff, #${secondaryThemeColor || '77777'}  )`, color: `#${secondaryThemeColor}` }}>
        <h1 className={`${styles["section-title"]} transition-colors duration-[1500ms]`} style={{ backgroundColor: `#${themeColor || '777777'}`, color: '#000000' }}>FILMS</h1>
        <div className={`${styles["film-list-filters"]} flex justify-between transition-colors duration-[1500ms]`}>
          <Tab className='w-full' onClick={() => setSelectedTab('all')} ref={allTabRef} themeColor={`${themeColor || 'bbbbbb'}`} secondaryThemeColor={`${secondaryThemeColor || '777777'}`} selected={selectedTab === 'all'} sectionCount={TMDB.films.length} >
            ALL
          </Tab>
          <Tab className='w-full' onClick={() => setSelectedTab('faves')} selected={selectedTab === 'faves'} ref={faveTabRef} sectionCount={favourites.length} themeColor={`${themeColor || 'bbbbbb'}`} secondaryThemeColor={`${secondaryThemeColor || '777777'}`}>
            FAVES
          </Tab>
        </div>
        <div className='overflow-y-scroll'>
          {filmRows}
        </div>
      </div>
      <div className={`${styles["film-details"]} relative overflow-y-hidden transition-colors duration-[1500ms]`} style={{ backgroundImage: `linear-gradient(to bottom, #${secondaryThemeColor || '777777'}aa 0%, #${secondaryThemeColor || '777777'}88 5%, #000000` }}>
        <h1 className={`${styles["section-title"]} transition-colors duration-[1500ms]`} style={{ backgroundColor: `#${themeColor || 'bbbbbb'}` }}>DETAILS</h1>
        <FilmDetails {...{ films, localUrl, selectedFilmId, visible, firstFilmSelected }} ref={filmDetailsRef} />
      </div>
    </div>

  )
}


export default FilmLibrary