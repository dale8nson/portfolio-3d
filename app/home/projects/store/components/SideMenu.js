'use client'
import { motion } from 'framer-motion';

import { AppButton } from './AppButton';
import { SearchInput } from './SearchInput';
import { useAppSelector, useAppDispatch, setSelectedProducts } from '../store';

export const SideMenu = ({ items, className, open }) => {

  const dispatch = useAppDispatch();
  const headerReduced = useAppSelector(state => state.main.headerReduced)

  const variants = {
    toggle: (open) => ({
      transform: `translate(${open ? '0': '-100%'}, ${headerReduced? '-2rem' :'0'})`,
      transition: {duration: 0.5}
    })
  }

  return (
    <motion.div initial={false} custom={open} animate='toggle' className={`md:hidden flex-col bg-gray-200/50 backdrop-blur-md ${className}`} variants={variants}>
      <ol>
        <li>
        <SearchInput />
        </li>
        {items.map(item => {
          return (
            <li key={item}>
              <AppButton onClick={() => dispatch(setSelectedProducts(item.toLowerCase()))}>
                {item}
              </AppButton>
            </li>
          )
        })}
      </ol>
    </motion.div>
  )
}