import { forwardRef } from "react"

export const Button = forwardRef(function Button({ className, onClick, onMouseLeave, icon, style }, ref) {
  return <button className={className} onClick={onClick} onMouseLeave={onMouseLeave} style={style} ref={ref}>
    <span className="material-icons">{icon}</span>
  </button>
})