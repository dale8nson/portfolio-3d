'use client'
import { forwardRef } from 'react';

export const Product = forwardRef(function Product({ name, category, description, price, imgUrl, scale, yOffset }, ref) {
  const numberFormat = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' });

  return (
    <li className='relative flex-col m-2 w-auto list-none bg-gray-200/60 rounded-lg text-gray-800 px-1 transition-transform duration-500 justify-start md:justify-evenly backdrop-blur-md md:h-[32.5rem]'
      ref={ref}>
      <div className='relative z-10 m-0 flex'>
        <h1 className='relative p-0 text-[1.8rem] text-center z-10'>{name.toUpperCase()}</h1>
        <h2 className='absolute text-5xl m-auto text-center text-white/75 z-10 [writing-mode:vertical-lr] [text-orientation:upright] [letter-spacing:-20px] top-9 -left-2 '>{category}</h2>
      </div>
      <div className={`relative w-full z-0 md:h-[20rem] overflow-hidden `}>
        <img className={`relative z-10 w-full  object-contain`} src={imgUrl}  alt='' style={{transform: `translate(0, ${yOffset}) scale(${scale})`}} />
      </div>
      <div className='md:absolute md:bottom-4 mr-4 z-20'>
        <p className='text-2xl'>{description}</p>
        <h2 className='text-right text-2xl'><strong>{numberFormat.format(price)}</strong></h2>
      </div>
    </li>
  ); 
})