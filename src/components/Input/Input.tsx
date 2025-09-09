import type { InputHTMLAttributes } from 'react'
import type { FieldValues, UseFormRegister, RegisterOptions, Path } from 'react-hook-form'

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errorMessages?: string
  placeHolder?: string
  name: Path<T>
  classNameInput?: string
  className?: string
  classNameError?: string
  register?: UseFormRegister<T>
  rules?: RegisterOptions<T, Path<T>>
}

export default function Input<T extends FieldValues>({
  errorMessages,
  className,
  name,
  register,
  rules,
  classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow',
  classNameError='mt-1.3 text-red-600 min-h-[1.3rem] text-sm',
  ...rest
}: Props<T>) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...registerResult}
        {...rest}        
      />
      <div className={classNameError}>{errorMessages}</div>
    </div>
  )
}
