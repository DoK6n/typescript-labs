import { delay, http, HttpResponse } from 'msw'
import type { Product } from '~/entities/products/model'
import type { Pagination } from '~/entities/products/api'
import data from './data'

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || '1')
    const limit = Number(url.searchParams.get('limit') || '9')

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedProducts = data.products.slice(startIndex, endIndex)

    const response: Pagination<Product[]> = {
      data: paginatedProducts,
      limit: limit,
      skip: page,
      total: data.products.length,
      totalPages: Math.ceil(data.products.length / limit),
    }

    await delay(300)

    return HttpResponse.json(response)
    // return new HttpResponse(null, { status: 401 })
  }),

  http.get('/api/products/:productId', async ({ params }) => {
    const response = data.products.find(product => product.id === params.productId)

    await delay(300)

    return HttpResponse.json(response)
    // return HttpResponse.error()
    // return new HttpResponse(null, { status: 401 })
  }),
]
