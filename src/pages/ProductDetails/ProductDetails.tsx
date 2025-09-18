import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
import { useEffect, useMemo, useState, useRef } from 'react'
import productApi from '../../apis/product.api'
import InputNumber from '../../components/InputNumber/InputNumber'
import ProductRating from '../ProductList/components/ProductRating'
import DOMPurify from 'dompurify'
import type { ProductListConfig } from '../../types/product.types'
import Product from '../ProductList/components/Product'

export default function ProductDetails() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)

  const { data: productDetailsData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetails(id as string),
    enabled: !!id
  })

  const [currentImageIndex, setCurrentImageIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const product = productDetailsData?.data.data
  const imageRef = useRef<HTMLImageElement>(null)
  const images = useMemo(() => (product ? product.images : []), [product])

  const currentImage = useMemo(() => images.slice(...currentImageIndex), [images, currentImageIndex])

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0])
    }
  }, [images])

  const next = () => {
    if (currentImageIndex[1] < images.length) {
      setCurrentImageIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentImageIndex[0] > 0) {
      setCurrentImageIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleZoom = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!product) {
    return null
  }

  return (
    <div className='bg-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-5'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  //pointer-events-none to prevent event bubble
                  className='pointer-events-none absolute top-0 left-0 bg-white w-full h-full object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-9 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {(currentImage as string[]).slice(0, 5).map((img) => {
                  const isActive = img == activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 bg-white w-full h-full cursor-pointer object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-[#ee4d2d] ' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-9 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-[#ee4d2d] text-[#ee4d2d]'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-[#ee4d2d] text-[#ee4d2d] h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Sold</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-[#ee4d2d]'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-[#ee4d2d] px-1 py-[2px] text-xs font-semibold text-white'>
                  {rateSale(product.price_before_discount, product.price)} off
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Quantity</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    className=''
                    classNameError='hidden'
                    classNameInput='h-8 w-12 border-t border-b border-gray-300 p-1 text-center outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-gray-500 text-sm'>{product.quantity} available</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 px-8 items-center justify-center rounded-xs border border-[#ee4d2d] bg-[#ffeee8] text-[#ee4d2d] shadow-sm hover:bg-[#fff5f1] cursor-pointer'>
                  <img
                    alt='icon-add-to-cart'
                    className='mr-4 h-5 w-5'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f600cbfffbe02cc144a1.svg'
                  ></img>
                  Add To Cart
                </button>
                <button className='ml-4 flex h-12 min-w-[10rem] items-center justify-center rounded-xs bg-[#ee4d2d] capitalize text-white shadow-sm hover:bg-[#f05d40] cursor-pointer'>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='max-w-7xl mx-auto px-5'>
          <div className='bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Product Description</div>
            <div className='mx-4 mt-6 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='max-w-7xl mx-auto px-5'>
          <div className='uppercase text-[#858a8a] font-medium'>you may also like</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
