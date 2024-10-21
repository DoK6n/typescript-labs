import { keepPreviousData, queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
import { getDetailProduct, getProducts } from './fetchers'

export const productQueries = {
  products: () =>
    infiniteQueryOptions({
      queryKey: ['products'],
      queryFn: ({ pageParam = 1 }) => getProducts({ searchParams: { limit: 9, page: pageParam } }),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        return lastPage.totalPages > lastPage.skip ? lastPage.skip + 1 : undefined
      },
    }),
  product: (input: { productId: string }) =>
    queryOptions({
      queryKey: ['product', input.productId],
      queryFn: () => getDetailProduct({ pathParams: { productId: input.productId } }),
      placeholderData: keepPreviousData,
    }),
}
