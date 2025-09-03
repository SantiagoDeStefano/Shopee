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
          <div className='flex items-center mt-4 ml-0.5'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span>300.000</span>
            </div>
            <div className='text-[#ee4d2d] truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span>284.000</span>
            </div>
          </div>
          <div className='mt-2 mb-2 flex items-center justify-start'>
            <div className='flex items-center px-1 bg-[#fff8E4] border rounded-sm border-[#ffd050]'>
              <img
                src='https://down-vn.img.susercontent.com/file/id-11134258-7r98o-ly1pxywrszyh0b_tn.webp'
                alt='rating-star'
                className='inline-block align-middle w-2.5 h-2.5'
              />
              <span className='inline-block truncate ml-1 text-xs text-black'>4.9</span>
            </div>
            <span className='ml-2 text-xs'>40k+ sold</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
