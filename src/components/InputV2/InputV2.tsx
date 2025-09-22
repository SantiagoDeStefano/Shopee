import { useState, type InputHTMLAttributes } from 'react'
import { useController, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputNumberProps<TFieldValues, TName>) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow',
    classNameError = 'mt-1.3 text-red-600 min-h-[1.3rem] text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value ?? '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type == 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput == '')

    if (numberCondition || type != 'number') {
      // Update localValue
      setLocalValue(valueFormInput)

      // Call field.onchange to update RHF's state
      field.onChange(event)

      // Execute onChange callback from outside passed to Props
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}

export default InputV2
