'use client'
export const TableSkeleton = ({colSpan}) => {
  return (
    <div className='[&_*]:animate-pulse [&_*]:bg-neutral-500 flex-col align-middle justify-items-center w-full' >
      {Array(12).fill(null).map((_, index) => {
        return (
          <div key={index} className={`h-[35px] my-[15px] mx-4 rounded-md col-span-[${colSpan}]`} />
        )
      })}
    </div>
  )
}