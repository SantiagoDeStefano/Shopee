import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to='/'>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltl65jx0bua56f_tn.webp'
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            FILM INSTAX MINI Date cao Giấy in ảnh Viền trắng cho Máy ảnh chụp lấy liền Fujifilm Instax Mini 12/EVO/11
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span className='inline-flex items-center ml-1.5 px-1 py-0.5 h-4 text-[10px] text-[#ee4d2d] rounded-xs border border-[#ee4d2d]'>
            Cheap on Shopee
          </span>
          <div className='flex flex-row justify-start items-stretch overflow-hidden max-w-full text-ellipsis'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='h-4 w-2 -mr-[2px] block'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                stroke-width='1'
                transform=''
                stroke='#F69113'
                fill='#F69113'
              ></path>
            </svg>
            <span className='px-1 py-0.5 bg-[#f69113] text-[10px] text-white'>8% off</span>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 4 16' className='rotate-180 h-4 w-2 -ml-[2px] block'>
              <path
                d='M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3'
                stroke-width='1'
                transform=''
                stroke='#F69113'
                fill='#F69113'
              ></path>
            </svg>
          </div>
        </div>
        <div className='flex items-center mt-3 ml-0.5'>
          <div className='line-through max-w-[50%] text-gray-500 truncate'>
            <span className='text-xs'>₫</span>
            <span>300.000</span>
          </div>
          <div className='text-[#ee4d2d] truncate ml-1'>
            <span className='text-xs'>₫</span>
            <span>284.000</span>
          </div>
        </div>
        <div className='mt-1 flex items-center justify-end'>
          <span className='mr-1 mb-1 text-sm'>4k+ sold</span>
        </div>
      </div>
    </Link>
  )
}
