import type { RegisterOptions } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

// More precise type definition
type Rules = Record<keyof FormData, RegisterOptions<FormData, keyof FormData>>

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      message: 'Email must be a valid Google email address'
    },
    maxLength: {
      value: 160,
      message: 'Email must be between 5 - 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Email must be at least 5 - 160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Password must be at least 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Password must be at least 6 - 160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    maxLength: {
      value: 160,
      message: 'Password must be at least 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Password must be at least 6 - 160 characters'
    },
    validate: (value, formValues ) => {
      if (value != formValues.password) {
        return 'Passwords do not match'
      }
    }
  }
}
