import path from '../../../../constants/path'
import Button from '../../../../components/Button'
import classNames from 'classnames'
import InputNumber from '../../../../components/InputNumber'
import RatingStars from '../RatingStars'

import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import type { Category } from '../../../../types/category.types'
import { useForm } from 'react-hook-form'
import { priceSchema, type PriceSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import type { QueryConfig } from '../../../../hooks/useQueryConfig'
import InputV2 from '../../../../components/InputV2'

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

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

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
            {/* <Controller
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
            /> */}
            <InputV2
              control={control}
              type='number'
              name='price_min'
              className='grow'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow bg-white'
              classNameError='hidden'
              placeholder='₫ MIN'
              onChange={() => {
                trigger('price_max')
              }}
            />

            <div className='mx-2 mt-2 shrink-0 h-[1px]'>⎯</div>
            <InputNumber
              type='text'
              className='grow'
              classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow bg-white'
              classNameError='hidden'
              placeholder='₫ MAX'
            />

            {/* <Controller
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
            /> */}
          </div>
          <div className='mt-1.3 text-red-600 min-h-[1.3rem] text-sm text-center'>{errors.price_min?.message}</div>
          <Button className='w-full p-2 uppercase bg-[#ee4d2d] hover:cursor-pointer text-white hover:bg-[#e64626] text-sm flex justify-center items-center'>
            Apply
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Rating</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full p-2 uppercase bg-[#ee4d2d] hover:bg-[#e64626] hover:cursor-pointer text-white text-sm flex justify-center items-center'
        onClick={handleRemoveAll}
      >
        Clear all
      </Button>
    </div>
  )
}
