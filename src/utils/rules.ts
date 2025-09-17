import * as yup from 'yup'

export const authSchema = yup.object({
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

export const priceSchema = yup.object({
  price_min: yup
    .string()
    .default('')
    .test({
      name: 'invalid-price',
      message: 'Invalid price',
      test: function (value) {
        const price_min = value
        const { price_max } = this.parent
        if (price_min != '' && price_max != '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min != '' || price_max != ''
      }
    }),
  price_max: yup
    .string()
    .default('')
    .test({
      name: 'invalid-price',
      message: 'Invalid price',
      test: function (value) {
        const price_max = value
        const { price_min } = this.parent
        if (price_min != '' && price_max != '') {
          return Number(price_max) >= Number(price_min)
        }
        return price_min != '' || price_max != ''
      }
    })
})

export const productNameSchema = yup.object({
  name: yup
  .string()
  .trim()
  .required('Product\'s name is required.')
})

export type ProductNameSchema = yup.InferType<typeof productNameSchema>
export type AuthSchema = yup.InferType<typeof authSchema>
export type PriceSchema = yup.InferType<typeof priceSchema>
