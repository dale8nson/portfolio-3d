'use client'
import { useAppSelector } from "../store";

export const AppButton = ({ onClick, children }) => {
  const selectedProducts = useAppSelector(state => state.main.selectedProducts);

  return (
    <button onClick={onClick} className={`bg-inherit text-center rounded-md md:mx-3 p-2 hover:text-gray-600  hover:bg-gray-200/70 transition-colors duration-200`} style={{color: selectedProducts === children.toLowerCase() ? 'rgb(75, 85, 99)' : 'rgb(55, 65, 81)', backgroundColor: selectedProducts === children.toLowerCase() ? 'rgba(229, 231, 235, 0.7)' :'inherit'}}>
      {children}
    </button>
  );
}