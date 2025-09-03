import Input from '../../components/Input/Input'
import Button from '../../components/Button'
import authApi from '../../apis/auth.api'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authSchema, type AuthSchema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { type ErrorResponse } from '../../types/util.types'
import { AppContext } from '../../contexts/app.context'
import { useContext } from 'react'
import { setProfileToLocalStorage } from '../Profile/auth'

type LoginForm = Omit<AuthSchema, 'confirm_password'>
const loginSchema = authSchema.omit(['confirm_password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginForm) => {
      return authApi.loginAccount(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    loginAccountMutation.mutate(body as LoginForm, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfileToLocalStorage(data.data.data.user)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<LoginForm, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<LoginForm, 'confirm_password'>, {
                message: formError[key as keyof Omit<LoginForm, 'confirm_password'>],
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
              <div className='text-2xl'>Log In</div>
              <Input<LoginForm>
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessages={errors.email?.message}
                placeHolder='Email'
              />
              <Input<LoginForm>
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessages={errors.password?.message}
                placeHolder='Password'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className={`w-full rounded py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center ${loginAccountMutation.isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Log In
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-slate-400'>New to Shopee?</span>
                <Link to='/register' className='text-[#ee4d2d] ml-1 font-bold'>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
