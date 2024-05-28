'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { products } from "../products";
import { Product } from "./Product";
import { useAppSelector, useAppDispatch, setCoords } from "../store";
import { motion } from 'framer-motion';


export const ProductList = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(state => state.main.selectedProducts);
  const pageSize = useAppSelector(state => state.main.pageSize);
  const oldPageSize = useRef(pageSize);
  // const coords = useAppSelector(state => state.main.coords);
  console.log(`pageSize: `, pageSize);
  const [coords, setCoords] = useState([]);
  const refs = useRef(Array(products.length).fill(null));
  const oldRefs = useRef([]);

  const searchString = useAppSelector(state => state.main.searchString);

  let productList;
  if (selectedProducts === 'all') {
    productList = products;
  } else if (products.some(product => product.category === selectedProducts)) {
    productList = products.filter(product => product.category === selectedProducts);
  } else {
    productList = products.filter(product => {
      const { name, category, description, price } = product;
      const text = Object.values([name, category, description, price]).join(' ').toLowerCase();
      return text.includes(searchString.toLowerCase());
    })
  }
  const refCounter = useRef(0);
  const initRef = useCallback((id, index, node) => {
    if (!node) return;
    refCounter.current += 1;
    console.log(`refCounter: ${refCounter.current}`)
    if (!refs.current) refs.current = [];
    refs.current = refs.current.toSpliced(index, 1, { id, node });
    if (index === products.length - 1) {
      oldRefs.current = refs.current;
    }
  },[]);


  const nodeCoords = useMemo(() => {

    if (refs.current.some(node => node === null)) return null;
    console.log(`pageSize changed: new width: ${pageSize.width} new height: ${pageSize.height}`);
    const crds = [];
    for (const  nodeRef of refs.current) {
      const { id, node } = nodeRef;
      const { id:oldId, node:oldNode } = oldRefs.current.find(node => node.id === id);
      const { x, y, width, height } = node.getBoundingClientRect();
      const { x: oldX, y: oldY, width: oldWidth, height: oldHeight } = oldRefs.current.find(node => node.id === id);
      const [dX, dY, pageWidthDelta, pageHeightDelta] = [x - oldX, y - oldY, width - oldWidth, height - oldHeight]
      let offScreenCoordsDx = x + dX < pageSize.width / 2 ? -(x + dX + width + pageWidthDelta) : pageSize.width - x;

      let offScreenCoordsDy = y < pageSize.height / 2 ? -(y + height) :
        pageSize.height - y;
      console.log(`offScreenCoordsDx: ${offScreenCoordsDx}`);
      crds.push({ id, x, y, width, height, offScreenCoordsDx, offScreenCoordsDy });
    }
    oldRefs.current = refs.current;
    return crds;
  }, [pageSize]);



  const variants = {
    move: (newDeltaCoords) => {
      const { dx, dy } = newDeltaCoords;

      return {
        transform: `translate(${dx}px, ${dy}px)`,
        opacity: 1,
        transition: { duration: 1 }
      }
    }
  }

  const animationEndCounter = useRef(0);
  const handleAnimationEnd = (index) => {
    animationEndCounter.current += 1;
    console.log(`animationEndCounter: ${animationEndCounter}`);
    const { id, node } = refs.current[index];
    const { x, y, width, height } = node.getBoundingClientRect();
    const offScreenCoordsDx = x < pageSize.width / 2 ? -(x + width) : pageSize.width - x;
    const offScreenCoordsDy = y < pageSize.height / 2 ? -(y + height) :
      pageSize.height - y;
    nodeCoords[index] = nodeCoords[index].toSpliced(index, 1, { id, x, y, width, height, offScreenCoordsDx, offScreenCoordsDy });
    setCoords(nodeCoords);

  }

  const productNodes = products.map((product, index) => {
    const { id, name, category, description, price, imgUrl, yOffset, scale } = product;

    const visible = selectedProducts === 'all' ? true : productList.some(product => product.id === id);

    let dx = 0, dy = 0;
    let recalculateCoords = false;

    if (coords[index]) {
      const { offScreenCoordsDx: oldOffScreenCoordsDx, offScreenCoordsDy: oldOffScreenCoordsDy } = coords[index];

      const { x: oldX, y: oldY } = coords.find(item => item.id === id);

      const listIndex = productList.findIndex(item => item.id === id);
      // let newX = oldX, newY = oldY, newOffScreenCoordsDx = oldOffScreenCoordsDx, newOffScreenCoordsDy = oldOffScreenCoordsDy;
      let { x: newX, y: newY, offScreenCoordsDx: newOffScreenCoordsDx, offScreenCoordsDy: newOffScreenCoordsDy } = nodeCoords[index];

      if (listIndex > -1) {
        const newCoords = nodeCoords[listIndex];
        [newX, newY] = [newCoords.x, newCoords.y];
      }

      if (newX === oldX + oldOffScreenCoordsDx || newY === oldY + oldOffScreenCoordsDy) {
        [dx, dy] = [0, 0];
        recalculateCoords = true;
      } else {

        dx = visible ? -(oldX - newX) : newOffScreenCoordsDx;
        dy = visible ? -(oldY - newY) : newOffScreenCoordsDy;
      }
    }

    const newDeltaCoords = { dx, dy };

    return (
      <motion.ul key={index}
        custom={newDeltaCoords}
        initial={{
          transform: `translate(0px,0px)`,
          transition: { duration: 1 },
          opacity: 0
        }}
        animate='move'
        variants={variants}
        onAnimationEnd={recalculateCoords ? () => handleAnimationEnd(index) : null}
      >
        <Product {...{ index, name, category, description, price, imgUrl, yOffset, scale }} ref={node => initRef(id, index, node)} />
      </motion.ul>
    )
  });

  useEffect(() => {
    if (nodeCoords) {
      setCoords(nodeCoords);
      console.log(`nodeCoords:`, nodeCoords);
    }

  }, [nodeCoords]);

  return (
    <div className='grid md:grid-flow-row grid-cols-1 md:grid-cols-3 relative top-[-10rem] md:top-[1rem]'>
      {productNodes}
    </div>

  );
}