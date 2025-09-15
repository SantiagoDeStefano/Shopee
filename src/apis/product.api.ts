import http from '../utils/http'

import type { Product, ProductList } from '../types/product.types.ts'
import { type ProductListConfig } from '../types/product.types.ts'
import { type SuccessResponse } from '../types/util.types.ts'

const URL = '/products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetails(_id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${_id}`)
  }
}

export default productApi