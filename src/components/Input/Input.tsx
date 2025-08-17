import type { FieldValues, UseFormRegister, Path } from 'react-hook-form'

interface Props<T extends FieldValues> {
  type: React.HTMLInputTypeAttribute
  errorMessages?: string
  placeHolder?: string
  className?: string
  name: Path<T>
  register: UseFormRegister<T>
  autoComplete?: string
}

export default function Input<T extends FieldValues>({ type, errorMessages, placeHolder, className, name, register, autoComplete }: Props<T>) {
  return (
    <div className={className}>
      <input
        type={type}
        className='px-3 h-11 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
        placeholder={placeHolder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <div className='mt-1.3 text-red-600 min-h-[1.3rem] text-sm'>{errorMessages}</div>
    </div>
  )
}
