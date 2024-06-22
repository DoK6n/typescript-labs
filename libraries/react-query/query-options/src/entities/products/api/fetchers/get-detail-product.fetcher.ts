import { apiClient } from '~/shared/api'
import type { Product } from '../../model'
import { RequestOptionPathParams } from '../types'

export const getDetailProduct = async ({
  pathParams: { productId },
}: RequestOptionPathParams<{ productId: string }>) => {
  const response = await apiClient.get(`api/products/${productId}`)

  if (!response.ok) {
    throw new Error('제품 상세 정보를 가져오는 데 실패했습니다.')
  }

  const data = await response.json<Product>()

  return data
}
