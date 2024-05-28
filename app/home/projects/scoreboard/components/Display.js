export const Display = ({ runs, wickets }) => {
  return (
    <div className=' relative border-solid border-amber-800 border-spacing-4 border-2 p-2 m-2'>
      <div className='flex m-1 text-4xl justify-start w-full font-[technology] text-gray-500 z-0 absolute top-2'>
        <h1>888888888888888888</h1>
      </div>
      <div className='flex m-1 text-4xl justify-start w-full font-[technology] text-gray-500 z-0 absolute top-2'>
        <h1>RRRRRRRRRRRRRRRRRR</h1>
      </div>
      <div className='flex m-1 text-4xl justify-start w-full font-[technology] text-gray-500 z-0 absolute top-2'>
        <h1>NNNNNNNNNNNNNNNNNN</h1>
      </div>
      <div className='relative flex m-0 z-10  text-4xl justify-start w-full font-[technology] text-gray-900 bg-opacity-60 bg-green-600'>
        <h1 className="m-1">Runs: </h1>
        <h1 className="m-1">{runs}</h1>
        <h1 className="m-1">Wickets: </h1>
        <h1 className="m-1">{wickets}</h1>
      </div>
    </div>
  );
}