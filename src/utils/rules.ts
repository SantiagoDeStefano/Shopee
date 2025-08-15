import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Google email address')
    .min(5, 'Email must be between 5 - 160 characters')
    .max(160, 'Email must be between 5 - 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 - 160 characters')
    .max(160, 'Password must be at least 6 - 160 characters'),
  confirm_password: yup
    .string()
    .required('Password confirmation is required')
    .min(6, 'Password must be at least 6 - 160 characters')
    .max(160, 'Password must be at least 6 - 160 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match')
})

export type Schema = yup.InferType<typeof schema>