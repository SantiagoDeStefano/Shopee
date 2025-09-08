import classNames from 'classnames'
import { orderBy, sortBy } from '../../../constants/product'
import type { QueryConfig } from '../ProductList'
import type { ProductListConfig } from '../../../types/product.types'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by == sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sort by</div>
          <button
            className={classNames('h-8 px-4 capitalize hover:cursor-pointer text-center', {
              'bg-[#ee4d2d] hover:bg-[#e64626] text-white': isActiveSortBy(sortBy.view),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Popular
          </button>
          <button
            className={classNames('h-8 px-4 capitalize hover:cursor-pointer text-center', {
              'bg-[#ee4d2d] hover:bg-[#e64626] text-white': isActiveSortBy(sortBy.createdAt),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Lastest
          </button>
          <button
            className={classNames('h-8 px-4 capitalize hover:cursor-pointer text-center', {
              'bg-[#ee4d2d] hover:bg-[#e64626] text-white': isActiveSortBy(sortBy.sold),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Top Sales
          </button>
          <select
            className={classNames('h-8 px-4 capitalize hover:cursor-pointer text-center', {
              'bg-[#ee4d2d] hover:bg-[#e64626] text-white': isActiveSortBy(sortBy.price),
              'bg-white hover:bg-slate-100 text-black': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Price
            </option>
            <option value={orderBy.asc} className='bg-white text-black'>
              Price: Low to High
            </option>
            <option value={orderBy.desc} className='bg-white text-black'>
              Price: High to Low
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-[#ee4d2d]'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page == 1 ? (
              <span className='flex justify-center items-center w-9 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-50 cursor-not-allowed shadow'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex justify-center items-center w-9 h-8 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-50 hover:cursor-pointer shadow'
              >
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
              </Link>
            )}

            {page == pageSize ? (
              <span className='flex justify-center items-center w-9 h-8 rounded-tr-sm rounded-br-sm bg-white/60 hover:bg-slate-50 cursor-not-allowed shadow'>
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
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex justify-center items-center w-9 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-50 hover:cursor-pointer shadow'
              >
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
              </Link>
            )}

            {/* <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-50 hover:cursor-pointer shadow'>
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
