import InputNumber, { type InputNumberProps } from '../InputNumber'

interface QuantityProps extends InputNumberProps {
  max: number
  onIncrease: (value: number) => void
  onDecrease: (value: number) => void
  onType: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10 flex items-center',
  value,
  ...rest
}: QuantityProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max != undefined && _value > max) {
      _value = max
    } else if (_value < 0) {
      _value = 1
    }
    onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max != undefined && _value > max) {
      _value = max
    }
    onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 0
    }
    onDecrease(_value)
  }

  return (
    <div className={classNameWrapper}>
      <button
        className='hover:cursor-pointer flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        value={value}
        className=''
        classNameError='hidden'
        classNameInput='h-8 w-12 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handleChange}
        {...rest}
      />
      <button
        className='hover:cursor-pointer flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
