'use client'
import { useEffect, useRef } from 'react'

import { Button } from './Button'

import styles from './FilmRow.module.css'

const FilmRow = ({ id, title, year, themeColor, secondaryThemeColor, poster_path, release_date, onClick, selected, favourite, visible, addToFavourites, removeFromFavourites, selectedFilmId }) => {

  const rowRef = useRef(null)
  const favRef = useRef(null)

  const previousThemeColor = useRef(null)

  const handleFavouritesClick = () => {
    // console.log(`handleFavouritesClick id: ${id}`)
    if (favourite) {
      removeFromFavourites(id)
      favRef.current.classList.remove(`text-[#ffff00]`)
      favRef.current.classList.add('bg-transparent')
    }
    else {
      addToFavourites(id)
      favRef.current.classList.remove(`hover:text-[#ffff00]`, 'bg-transparent')
      favRef.current.classList.add(`bg-transparent`)
    }
  }

  useEffect(() => {
    favRef.current.onPointerLeave = () => favRef.current.classList.add(`hover:bg-[#${themeColor || 'bbbbbb'}]`, 'bg-transparent')

    // rowRef.current.classList.replace(`hover:bg-[#${themeColor || 'bbbbbb'}]`,`hover:bg-[#${themeColor || 'bbbbbb'}]`)
    
      // rowRef.current.classList.replace(`hover:bg-[#${previousThemeColor.current || 'bbbbbb'}]`, `hover:bg-[#${themeColor || 'bbbbbb'}]`)
      // previousThemeColor.current = themeColor || 'bbbbbb'
    
  
  })

  return (
 <div id={id} className={`${styles.FilmRow} border-solid border-b-2`}  style={{backgroundColor: selected ? `#${themeColor || 'bbbbbb'}` : '#000000', borderColor: `#${secondaryThemeColor}`, display: visible ? 'flex' : 'hidden'}} onClick={onClick}  >
      <img src={`https://image.tmdb.org/t/p/w780${poster_path}`} alt={`${title} film poster`} />
      <div className={`${styles["film-summary"]} hover:bg-[#ffffff55]`} ref={rowRef}>
        <h3 className='text-2xl'><strong>{title}</strong></h3>
        <p>{year}</p>
        <p>Released: {new Date(release_date).getFullYear()}</p>
        <div className={styles.actions}>
          <Button {...{
            className: `hover:text-[#ffff00] bg-transparent p-2 text-2xl rounded-[100%] ${favourite ? `bg-[#${themeColor || 'bbbbbb'}]` : ''}`,
            icon: 'star_rate',
            onClick: handleFavouritesClick,
            onMouseLeave: () => {
              if (!favourite) {
                favRef.current.classList.add(`hover:text-[#ffff00]`, 'bg-[#000000]')
              }
            }
          }}
            ref={favRef}
            style={
              {
                color:
                  `${favourite ?
                    `#ffff00` :
                    ``
                  }`
              }
            }
          />
          {/* <Button {...{ className: `${styles.action}`, onClick, icon: 'read_more' }} style={{backgroundColor: selected ? `#${themeColor}` : '#000000', borderColor: `#${secondaryThemeColor}`}}/> */}
        </div>
      </div>
    </div>
  )
}

export default FilmRow


// style={{ borderBottomColor: `#${themeColor}` || '#000000' }}