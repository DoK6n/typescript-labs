import { delay, http, HttpResponse } from 'msw'
import type { Product } from '~/entities/products/model'
import type { Pagination } from '~/entities/products/api'

const data: { products: Product[] } = {
  products: [
    {
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      title: '고급 가죽 지갑',
      price: 100,
      description: '수작업으로 만든 이탈리아 가죽 지갑',
      category: '액세서리',
      image: '/images/luxury-leather-wallet.jpeg',
      rating: {
        rate: 4.8,
        count: 250,
      },
    },
    {
      id: 'd4e5f6a7-8b9c-0d1e-2f3g-4h5i6j7k8l9m',
      title: '스마트 워치 4세대',
      price: 200,
      description: '최신 기술이 집약된 스마트 워치, 건강 관리부터 일상 생활까지',
      category: '전자기기',
      image: '/images/smart-watch.jpeg',
      rating: {
        rate: 4.6,
        count: 180,
      },
    },
    {
      id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      title: '유기농 그린티 100g',
      price: 15,
      description: '산지 직송 신선한 유기농 그린티',
      category: '음료',
      image: '/images/organic-green-tea.jpeg',
      rating: {
        rate: 4.9,
        count: 95,
      },
    },
    {
      id: 'p0o9i8u7-y6t5-r4e3-w2q1-a1s2d3f4g5h6',
      title: '프리미엄 요가 매트',
      price: 45,
      description: '높은 탄성과 편안함을 제공하는 프리미엄 요가 매트',
      category: '스포츠용품',
      image: '/images/premium-yoga-mat.jpeg',
      rating: {
        rate: 4.7,
        count: 130,
      },
    },
  ],
}

export const handlers = [
  http.get('/api/products', async () => {
    const response: Pagination<Product[]> = {
      data: data.products,
      limit: 10,
      skip: 1,
      total: data.products.length,
      totalPages: Math.ceil(data.products.length / 10),
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
