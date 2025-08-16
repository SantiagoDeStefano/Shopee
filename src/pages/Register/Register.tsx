import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, type Schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { type ResponseApi } from '../../types/util.types'

import Input from '../../components/Input/Input'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => {
      return registerAccount(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-[#ee4d2d]'>
      <div className='max-w-7xl mx-auto px-5'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Sign Up</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessages={errors.email?.message}
                placeHolder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessages={errors.password?.message}
                placeHolder='Password'
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessages={errors.confirm_password?.message}
                placeHolder='Confirm password'
                autoComplete='on'
              />
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
