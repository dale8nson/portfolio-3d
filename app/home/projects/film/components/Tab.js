
import { forwardRef } from "react"
import styles from './FilmLibrary.module.css'

export const Tab = forwardRef(function Tab({ themeColor, secondaryThemeColor, selected, children, onClick, sectionCount, style }, ref) {

  const className = `!bg-[#${selected ? themeColor : secondaryThemeColor}] !text-[#000000] transition-colors duration-[1500ms]`

  return (
    <button
      className={`px-2 w-full transition-colors duration-[1500ms]`}
      onClick={onClick}
      ref={ref}
      style={{
        ...style,
        backgroundImage:
          `radial-gradient(circle at 50%, #${selected ?
            secondaryThemeColor :
            themeColor 
          }ff, ${selected ?
            `#${secondaryThemeColor}88` :
            `#${themeColor}00`})`,
        color: `#000000`,
        // transition: 'background-image 1.5s'
      }}
    >
      <h1 className={`text-black`}>
        {children}
        <span className={`${styles["section-count"]} bg-white`}>{sectionCount}</span>
      </h1>
    </button>
  )
})