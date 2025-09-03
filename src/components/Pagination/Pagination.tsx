import classNames from 'classnames'
import type { QueryConfig } from '../../pages/ProductList/ProductList'
import { Link, createSearchParams } from 'react-router-dom'
import path from '../../constants/path'

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20
1 2 [3] 4 5 .. 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

1 2 ... 4 5 [6] 8 9 ... 19 20

1 2 ... 13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ...18 19 [20]
*
*/

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let threeDotsLeft = false
    let threeDotsRight = false
    const renderThreeDotsLeft = (index: number) => {
      if (!threeDotsLeft) {
        threeDotsLeft = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
            ...
          </span>
        )
      }
      return null
    }
    const renderThreeDotsRight = (index: number) => {
      if (!threeDotsRight) {
        threeDotsRight = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderThreeDotsLeft(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderThreeDotsRight(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderThreeDotsLeft(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderThreeDotsRight(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('rounded px-3 py-2 shadow-sm mx-2 cursor-pointer', {
              'bg-[#ee4d2d] text-white': pageNumber == page,
              'bg-white': pageNumber != page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page == 1 ? (
        <button className='bg-white/30 rounded-sm px-3 py-2 shadow-sm mx-2 cursor-not-allowed'>Prev</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page == pageSize ? (
        <button className='bg-white/30 rounded-sm px-3 py-2 shadow-sm mx-2 cursor-not-allowed'>Prev</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded-sm px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Next
        </Link>
      )}
    </div>
  )
}
