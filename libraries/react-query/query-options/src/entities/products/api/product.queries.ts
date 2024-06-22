import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { RequestOptionSearchParams } from './types'
import { ProductSearchParams, getDetailProduct, getProducts } from './fetchers'

export const productQueries = {
  products: ({ searchParams }: RequestOptionSearchParams<ProductSearchParams>) =>
    queryOptions({
      queryKey: ['products'],
      queryFn: () => getProducts({ searchParams }),
      placeholderData: keepPreviousData,
      
    }),
  product: ({ productId }: { productId: string }) =>
    queryOptions({
      queryKey: ['product', productId],
      queryFn: () => getDetailProduct({ pathParams: { productId } }),
      placeholderData: keepPreviousData,
    }),
}
