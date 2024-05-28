'use client'
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, setPageSize } from './store';
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";


export default function Home() {


  const dispatch = useAppDispatch();

  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const nodeRef = useRef(null);
  const observerRef = useRef(null);

  const initRef = (node) => {
    if (!node) return;
    nodeRef.current = node;
    const { width, height } = node.getBoundingClientRect();
    dispatch(setPageSize({ width, height }));
    
  }

  useEffect(() => {
    if(!nodeRef.current) return;
    observerRef.current = new ResizeObserver((entries) => {
      const node = entries[0];
      const { width, height } = node.contentRect;
      dispatch(setPageSize({ width, height }));

    });
    observerRef.current.observe(nodeRef.current);

  }, [])

  return (
      <main className={`absolute top-0 left-0 w-full h-[100vh] `} ref={initRef}>
        <div className='bg-[url("/pexels-artem-podrez-7232406(b&w).jpg")] bg-cover w-full h-[100vh] bg-no-repeat bg-center bg-fixed'>
          <div className='fixed flex-col top-0 left-0 z-30' >
            <Header setSideMenuOpen={setSideMenuOpen} sideMenuOpen={sideMenuOpen}/>
            <SideMenu className='relative top-[5rem] h-[100vh]' items={['ALL', 'JACKETS', 'SHIRTS', 'PANTS', 'SKIRTS']} open={sideMenuOpen} />
          </div>
          <div  className='h-[100vh] overflow-scroll'>
            <div className='relative top-[13rem]'>
              <ProductList />
            </div>
          </div>
        </div>
      </main>
  );
}