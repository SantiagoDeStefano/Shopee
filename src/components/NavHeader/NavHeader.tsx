import { useContext } from 'react'
import { queryClient } from '../../main'
import { purchasesStatus } from '../../constants/purchase'
import { AppContext } from '../../contexts/app.context'
import { useMutation } from '@tanstack/react-query'

import path from '../../constants/path'
import Popover from '../Popover'
import authApi from '../../apis/auth.api'
import { Link } from 'react-router-dom'

export default function NavHeader() {
  const { setIsAuthenticated, setProfile, profile, isAuthenticated } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Handle successful logout
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries(['purchases', { status: purchasesStatus.IN_CART }])
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-end'>
          {/* Language Popover*/}
          <Popover
            className='flex items-center py-1 hover:text-white/70 cursor-pointer text-white'
            renderPopover={
              <div className='bg-white text-black shadow-md rounded-sm border border-gray-200'>
                <div className='flex flex-col'>
                  <button className='py-4 px-6 hover:bg-slate-100 text-left hover:text-orange-500'>Tiếng Việt</button>
                  <button className='py-4 px-6 hover:bg-slate-100 text-left hover:text-orange-500'>English</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>English</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>

          {/* Profile Popover*/}
          {isAuthenticated && (
            <Popover
              className='flex items-center hover:text-white/70 cursor-pointer text-white ml-5'
              renderPopover={
                <div className='bg-white text-black shadow-md rounded-sm border border-gray-200'>
                  <div className='flex flex-col'>
                    <Link
                      to={path.profile}
                      className='py-3 px-5 pr-7 text-left hover:text-cyan-500 hover:bg-slate-100 w-full'
                    >
                      My Account
                    </Link>
                    <Link to='/' className='py-3 px-5 pr-7 text-left hover:text-cyan-500 hover:bg-slate-100 w-full'>
                      My Purchase
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='py-3 px-5 pr-7 text-left hover:text-cyan-500 hover:bg-slate-100 w-full'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              }
            >
              <div className='flex items-center py-1 hover:text-white/70 cursor-pointer text-white ml-5'>
                <div className='w-5 h-5 mr-2 flex-shrink-0'>
                  <img
                    src='https://down-vn.img.susercontent.com/file/vn-11134004-7ras8-mdip8iwuyfcf00_tn'
                    alt='avatar'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div>{profile?.email}</div>
              </div>
            </Popover>
          )}

          {/* Not signed in Popover*/}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize text-white hover:text-white/70'>
                Sign Up
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4' />
              <Link to={path.login} className='mx-3 capitalize text-white hover:text-white/70'>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
  )
}
