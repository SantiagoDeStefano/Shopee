import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from '../../utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
  })
  console.log('error:', errors)

  return (
    <div className='bg-[#ee4d2d]'>
      <div className='max-w-7xl mx-auto px-5'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Sign Up</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='px-3 h-11 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  className='px-3 h-11 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  className='px-3 h-11 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
                  placeholder='Confirm password'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='cursor-pointer w-full rounded text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Sign Up
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>Have an account?</span>
                <Link to='/login' className='text-[#ee4d2d] ml-1 font-bold'>
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
