import { Link } from 'react-router-dom'
import type { Product as ProductType } from '../../../../types/product.types'
import { formatCurrency, formatNumberToSocialStyle, formatRating } from '../../../../utils/utils'
import path from '../../../../constants/path'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>
            {product.name}
          </div>
          <div className='flex items-center mt-4 ml-0.5'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-[#ee4d2d] truncate ml-1'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-2 mb-2 flex items-center justify-start'>
            <div className='flex items-center px-1 bg-[#fff8E4] border rounded-sm border-[#ffd050]'>
              <img
                src='https://down-vn.img.susercontent.com/file/id-11134258-7r98o-ly1pxywrszyh0b_tn.webp'
                alt='rating-star'
                className='inline-block align-middle w-2.5 h-2.5'
              />
              <span className='inline-block truncate ml-1 text-xs text-black'>{formatRating(product.rating)}</span>
            </div>
            <span className='ml-2 text-xs'>{formatNumberToSocialStyle(product.sold)}+ sold</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
