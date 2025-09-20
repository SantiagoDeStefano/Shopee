import type { Product } from './product.types'

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = purchasesStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  user: string
  product: Product
  status: purchasesStatus
  createdAt: string
  updatedAt: string
}
