'use client'
import { useState } from "react";
import { Button } from "./Button";

export const HappinessPicker = ({ updateScore, pickerIndex }) => {
  
  const emojiScores = ["😧", "😔", "😑", "🙂", "😃"];
  const emojiAnims = ["e5Anim", "e4Anim", "e3Anim", "e2Anim", "e1Anim"];
  const animDurations = ['2s', '2s', '2s', '3s', '4s'];
  const animEaseFunctions = ['linear',  'linear',  'linear', 'ease-in-out', 'linear'];
  const [isPlaying, setIsPlaying] = useState(Array(5).fill(true));
  const [selected, setSelected] = useState(null);
  
  const toggleAnim = (index) => setIsPlaying(isPlaying.toSpliced(index, 1, !isPlaying[index]));
  
  // useEffect(() => {
  //   for (index in emojiScores) {
  //     setTimeout(() => toggleAnim(index), 3000 + Math.random() * 3000);
  //   }
  // });
  
  return (
    <div
      className="flex w-full text-8xl p-2 rounded-lg justify-evenly"
      style={{ backgroundColor: "#00000055" }}
    >
      {emojiScores.map((emoji, index) => {
        const init = node => { if(!node) return; setTimeout(() => node.getAnimations()[0]?.play(), 5000 + Math.random() * 3000); } 
        return (
          <div
            key={index}
            className={`rounded-full ${selected === index && 'border-solid border-red-500 border-4'}`}
            style={{
              animation: `${isPlaying[index] ? `${animDurations[index]} ${animEaseFunctions[index]} 1 ${emojiAnims[index]}` : ``}`
            }}
          >
            <Button
              text={emoji}
              onClick={() => { setSelected(index); updateScore(pickerIndex, index); }}
            />
          </div>
        );
      })}
    </div>
  );
};