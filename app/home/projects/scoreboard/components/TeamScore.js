'use client'
import { useState } from "react";
import { Button } from "./Button";
import { Display } from "./Display";

export const TeamScore = () => {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);

  const addRuns = (n) => setRuns(runs + n);
  const addWicket = () => setWickets(wickets + 1);

  return (
    <div className='flex-col border-solid border-[6px]  w-3/12 m-4 rounded-md border-chrome p-2 bg-brushed-metal '>
      <Display {...{runs, wickets}} />
      {wickets < 10 ? (<div className='flex bg-brushed-metal text-black font-sans justify-start w-full text-2xl'>
        <fieldset className='flex-col border-solid bg-brushed-metal border-amber-800 border-2 text-xs text-amber-800 m-1 rounded-sm p-0'>
          <legend className='text-xs mx-1'><strong>RUNS</strong></legend>
          <div className=' m-1 p-1 flex'>
          <Button onClick={() => addRuns(1)}>+1</Button>
          <Button onClick={() => addRuns(4)}>+4</Button>
          <Button onClick={() => addRuns(6)}>+6</Button>
          </div>
        </fieldset>
        <div className=''>
        <fieldset className=''>
          {/* <legend className='text-xs mx-1'><strong>WICKETS</strong></legend> */}
          <Button className='border-t-red-500 border-l-red-500 border-b-red-800 border-r-red-800' style={{backgroundImage:'radial-gradient(circle at center, rgb(220 38 38), rgb(248 113 113))'}} onClick={() => addWicket()}>WICKET</Button>
        </fieldset>
      </div>
      </div>) : <div className="flex justify-items-center m-auto w-[500px]"><h1 className='text-red-600 text-5xl'><strong>ALL OUT!!</strong></h1></div>}
    </div>
  );
}

