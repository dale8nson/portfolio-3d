'use client'
import { AppButton } from "./AppButton";
import { setSelectedProducts, useAppDispatch } from "../store";
import { SearchInput } from "./SearchInput";

export const AppBar = ({ className, style = {} }) => {

  const dispatch = useAppDispatch();

  const changeSelectedProducts = (category => {
    dispatch(setSelectedProducts(category.toLowerCase()));
    window.scrollTo(0, 0);
  });

  return (
    <nav
      className={`flex z-40 px-2 relative w-full -top-12 transition-transform duration-500 bg-gray-200/25 ${className}`}
      style={style}
    >
      <ul className='flex justify-around align-middle w-full text-2xl my-auto'>
        <li><AppButton onClick={() => changeSelectedProducts('all')}>ALL</AppButton></li>
        <li><AppButton onClick={() => changeSelectedProducts('jackets')}>JACKETS</AppButton></li>
        <li><AppButton onClick={() => changeSelectedProducts('shirts')}>SHIRTS</AppButton></li>
        <li><AppButton onClick={() => changeSelectedProducts('pants')}>PANTS</AppButton></li>
        <li><AppButton onClick={() => changeSelectedProducts('skirts')}>SKIRTS</AppButton></li>
        <li><SearchInput/></li>
      </ul>
    </nav>
  );
}