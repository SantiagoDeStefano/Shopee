import { useQuery } from '@tanstack/react-query'
import { purchasesStatus } from '../../constants/purchase'
import { Link } from 'react-router-dom'
import { formatCurrency, generateNameId } from '../../utils/utils'
import purchaseApi from '../../apis/purchase.api'
import path from '../../constants/path'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.IN_CART }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.IN_CART })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='overflow-auto'>
          <div className='min-w-[10px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center mr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-[#ee4d2d]' />
                  </div>
                  <div className='flex-grow text-black'>Product</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Unit Price</div>
                  <div className='col-span-1'>Quantity</div>
                  <div className='col-span-1'>Total Price</div>
                  <div className='col-span-1'>Actions</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {purchasesInCart?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500 mb-5 first:mt-0 last:mb-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center mr-3'>
                        <input type='checkbox' className='h-5 w-5 accent' />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`${path.home}${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-[#ee4d2d]'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white p-5 shadow border-gray-100 mt-10'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-[#ee4d2d]' />
            </div>
            <button className='mx-3 border-none bg-none'>Select All</button>
            <button className='mx-3 border-none bg-none'>Delete</button>
          </div>
          <div className='sm:ml-auto flex flex-col sm:flex-row mt-5 sm:mt-0 sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Total (1 item):</div>
                <div className='ml-2 text-2xl text-[#ee4d2d]'>₫180.000</div>
              </div>
              <div className='flex items-center sm:justify-end text-sm'>
                <div className='text-gray-500'>Saved</div>
                <div className='ml-6 text-[#ee4d2d]'>₫180.000</div>
              </div>
            </div>
            <Button className='ml-4 mt-5 sm:mt-0 h-10 w-52 rounded capitalize bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center cursor-pointer'>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
