export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sort by</div>
          <button className='h-8 px-4 capitalize bg-[#ee4d2d] text-white hover:cursor-pointer hover:bg-[#e64626] text-center'>
            Popular
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black hover:cursor-pointer hover:bg-slate-50 text-center'>
            Lastest
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black hover:cursor-pointer hover:bg-slate-50 text-center'>
            Top Sales
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black hover:cursor-pointer hover:bg-slate-50 text-center'>
            Top Sales
          </button>
          <select className='h-8 px-4 capitalize bg-white text-black hover:cursor-pointer hover:bg-slate-50 text-left'>
            <option value='' disabled>
              Price
            </option>
            <option value='price:asc'>Price: Low to High</option>
            <option value='price:desc'>Price: High to Low</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-[#ee4d2d]'>1</span>
            <span>/9</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-50 hover:cursor-pointer shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-50 hover:cursor-pointer shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
