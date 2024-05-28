'use client'
import { useState } from "react";
import { AppBar } from "./AppBar"
import { MenuButton } from "./MenuButton";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useAppDispatch, useAppSelector, setHeaderReduced } from "../store";

export const Header = ({sideMenuOpen, setSideMenuOpen}) => {
  const { scrollYProgress } = useScroll();
  const [styles, setStyles] = useState({
    container: { transform: 'scale(1, 1)' },
    text: { transform: 'scale(1, 1)' },
    appBar: { transform: 'translate(0, 0)' }
  });
  const headerReduced = useAppSelector(state => state.main.headerReduced);
  const dispatch = useAppDispatch();

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if ((value >= 0.03 || window.outerHeight < 500) && !headerReduced) {
      setStyles({
        container: { transform: 'scale(1, 0.6)' },
        text: { transform: 'translate(0, -6%) scale(0.5, 1)' },
        appBar: { transform: 'translate(0, -6rem)' },
        menuButton: { transform: 'translate(0, -30%)' }
      });
      dispatch(setHeaderReduced(true));
    } else if ((value < 0.03 && window.outerHeight > 500) && headerReduced) {
      setStyles({
        container: { transform: 'scale(1, 1)' },
        text: { transform: 'scale(1, 1)' },
        appBar: { transform: 'translate(0, 0)' },
        menuButton: { transform: 'translate(0,0)' }
      });
      dispatch(setHeaderReduced(false));
    }
  });

  return (
    <div className=' md:flex-col w-full fixed'>
      <div className='flex align-middle  bg-gray-200/25 pb-2 backdrop-blur-md w-full h-auto md:h-60 top-0 left-0 transition-transform duration-500 origin-top' style={styles.container} >
        <div className='relative left-[-1.75rem] m-auto flex text-center justify-items-center align-middle items-middle text-[3rem]  z-30 px-4 transition-transform origin-top duration-500' style={styles.text}>
          <h1 className='flex align-middle font-[accountant]  md:text-[9rem] relative  text-black' >
            <span className='relative left-[0.9rem] md:left-[1.2rem] md:top-3 '>
              <span>D</span>
              ale
            </span>
            <span className='flex align-baseline relative md:-top-1 font-[wireframe-italic] text-[7rem] md:text-[12rem]'>
              <span className='flex relative  top-[-2.75rem] text-[1.5rem] md:text-[5rem]'>
                <span className='relative top-[3.27rem] md:top-[4.2rem] left-[0.7rem] md:left-[1rem]'>b</span>
                <span className=' relative top-[3.8rem] md:top-[6rem] left-[0.3rem] md:left-[-0.17rem]'>y</span>
              </span>
              <span className='relative  text-[3rem] md:text-[9rem]'>
                <span className=' relative md:left-[-0.9rem]'>D</span>
                <span className=' relative md:left-[-1.7rem]'>e</span>
                <span className=' relative md:left-[-2.7rem]'>s</span>
                <span className=' relative md:left-[-3.4rem]'>i</span>
                <span className=' relative md:left-[-4.2rem]'>g</span>
                <span className=' relative md:left-[-4.7rem]'>n</span>
              </span>
            </span>
          </h1>

        </div>
      </div>
      <MenuButton onClick={() => setSideMenuOpen(!sideMenuOpen)} className='ml-4 md:hidden relative top-[-4rem]' style={styles.menuButton}/>
      <AppBar className='invisible md:visible absolute bottom-0' style={styles.appBar} />
    </div>
  )
}