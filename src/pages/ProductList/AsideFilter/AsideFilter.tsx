import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import Button from '../../../components/Button'
import type { QueryConfig } from '../ProductList'
import type { Category } from '../../../types/category.types'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { priceSchema, type PriceSchema } from '../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type PriceForm = PriceSchema

/**
 * Validate's rule
 * If price_min and price_max are not null => price_max >= price_min
 * No price_min then no price_max and vice versa
 */
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<PriceForm>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-[#ee4d2d]': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        All Categories
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul className='capitalize'>
        {categories.map((categoryItem) => {
          const isActive = category == categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-1', {
                  'text-[#ee4d2d] font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-[#ee4d2d] h-2 w-2 top-2 absolute left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
        <svg
          enable-background='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-[black] stroke-[black] mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit={10}
            ></polyline>
          </g>
        </svg>
        Search Filter
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Price Range</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow bg-white'
                    classNameError='hidden'
                    placeholder='₫ MIN'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0 h-[1px]'>⎯</div>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow bg-white'
                    classNameError='hidden'
                    placeholder='₫ MAX'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1.3 text-red-600 min-h-[1.3rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-[#ee4d2d] hover:cursor-pointer text-white hover:bg-[#e64626] text-sm flex justify-center items-center'>
            Apply
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Rating</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stop-color='#ffca11'></stop>
                      <stop offset='1' stop-color='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fill-rule='evenodd' stroke='none' stroke-width='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' stroke-width='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>& Up</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stop-color='#ffca11'></stop>
                      <stop offset='1' stop-color='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fill-rule='evenodd' stroke='none' stroke-width='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' stroke-width='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>& Up</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full p-2 uppercase bg-[#ee4d2d] hover:bg-[#e64626] hover:cursor-pointer text-white text-sm flex justify-center items-center'>
        Clear all
      </Button>
    </div>
  )
}
