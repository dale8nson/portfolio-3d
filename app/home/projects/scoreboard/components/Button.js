'use client'
import { useState } from "react";

export const Button = ({children, onClick, className, style}) => {

  const [ mouseButtonDown, setMouseButtonDown ] = useState(false);
  const toggleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
    setMouseButtonDown(!mouseButtonDown);
  }

  const tw = `text-gray-100 text-xl rounded-sm p-1 m-[.1px] border-solid ${ mouseButtonDown ? 'border-b-[#C3660B] border-r-[#C3660B] border-t-amber-600 border-l-amber-600 rounded-none' :'border-r-amber-800 border-b-amber-800 border-t-amber-400 border-l-amber-400' } border-[2.5px] w-full h-full  transition-all duration-150 ${className}`

  return (
    <div className='border-chrome border-solid border-4'>
    <button className={tw} onMouseDown={toggleMouseDown} onMouseUp={toggleMouseDown} onClick={onClick} style={{backgroundImage: mouseButtonDown ? 'radial-gradient(circle at center, rgb(217, 119, 6)), rgb(146, 64, 14)':'radial-gradient(circle at center, rgb(146, 64, 14), rgb(217, 119, 6))', ...style}} >{children}</button>
    </div>
  );
}