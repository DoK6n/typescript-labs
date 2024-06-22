import { apiClient } from '~/shared/api'
import type { Product } from '../../model'
import type { Pagination, RequestOptionSearchParams } from '../types'

export type ProductSearchParams = {
  page: number
  limit: number
}

export const getProducts = async ({
  searchParams,
}: RequestOptionSearchParams<ProductSearchParams>) => {
  const response = await apiClient.get('api/products', { searchParams })

  if (!response.ok) {
    throw new Error('제품 목록을 가져오는 데 실패했습니다.')
  }

  const data = await response.json<Pagination<Product[]>>()

  return data
}
