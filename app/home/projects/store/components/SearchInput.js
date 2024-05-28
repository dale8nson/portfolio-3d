'use client'
import { useAppDispatch, setSelectedProducts, setSearchString, useAppSelector } from "../store";
import { SearchIcon } from "./SearchIcon";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchString = useAppSelector(state => state.main.searchString);

  const changeSelectedProducts = (category => {
    dispatch(setSelectedProducts(category.toLowerCase()));
    window.scrollTo(0, 0);
  });

  const updateSearchString = (e) => {
    dispatch(setSearchString(e.target.value));
    changeSelectedProducts(searchString);
  };

  return (
    <div className=' flex m-2 w-1/4 md:w-full  bg-gray-50 my-auto rounded-md'>
      <input className=' text-gray-600 bg-gray-50 px-2 rounded-md' type='search' onChange={updateSearchString} />
      <button className='hover:bg-gray-400 transition-colors rounded-r-md' onClick={() => changeSelectedProducts(searchString)}><SearchIcon /></button>
    </div>
  )
}