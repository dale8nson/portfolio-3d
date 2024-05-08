export default function Loading () {
  return (
    <main className='h-screen w-screen'>
      <div className='w-full h-full flex-col justify-items-center items-center'>
        <h1 className='text-[#338833] font-[retro] animate-pulse '>PLEASE WAIT WHILE LOADING</h1>
        <h2 className='text-[#338833] font-[retro] animate-pulse '><small>Or your computer will self-destruct</small></h2>
      </div>
    </main>
  )
}