'use client'
import { useState } from "react";

export const Button = ({ text, onClick, style }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const toggleMouseOver = () => setMouseOver(!mouseOver);
  const toggleMouseDown = () => setMouseDown(!mouseDown);

  return (
    <button
      onMouseEnter={() => toggleMouseOver()}
      onMouseLeave={() => toggleMouseOver()}
      onMouseDown={() => toggleMouseDown()}
      onMouseUp={() => toggleMouseDown()}
      onClick={onClick}
      style={style}
    >
      {mouseDown ? "😵" : mouseOver ? "😳" : text}
    </button>
  );
};