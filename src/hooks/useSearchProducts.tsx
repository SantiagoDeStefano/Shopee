import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { omit } from 'lodash'
import path from '../constants/path'
import { yupResolver } from '@hookform/resolvers/yup'
import { productNameSchema, type ProductNameSchema } from '../../src/utils/rules'

type ProductNameForm = ProductNameSchema

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { handleSubmit, register } = useForm<ProductNameForm>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(productNameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config =
      queryConfig.order || queryConfig.category
        ? omit(
            {
              ...queryConfig,
              name: data.name
            },
            ['order', 'sort_by', 'category']
          )
        : {
            ...queryConfig,
            name: data.name
          }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, register }
}
