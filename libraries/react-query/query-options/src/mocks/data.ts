import { Product } from '~/entities/products/model'

const generateRandomProduct = (index: number): Product => {
  const images = [
    '/images/luxury-leather-wallet.jpeg',
    '/images/smart-watch.jpeg',
    '/images/organic-green-tea.jpeg',
    '/images/premium-yoga-mat.jpeg',
  ]
  const categories = [
    '액세서리',
    '전자기기',
    '음료',
    '스포츠용품',
    '의류',
    '도서',
    '주방용품',
    '화장품',
  ]
  const adjectives = [
    '프리미엄',
    '고급',
    '신상',
    '인기',
    '베스트셀러',
    '한정판',
    '클래식',
    '트렌디',
  ]

  return {
    id: crypto.randomUUID(),
    title: `${adjectives[Math.floor(Math.random() * adjectives.length)]} 상품 ${index + 1}`,
    price: Math.floor(Math.random() * 300) + 10,
    description: `이 상품은 품질과 디자인에서 뛰어난 제품입니다. 상품 번호: ${index + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    image: images[index % images.length],
    rating: {
      rate: Number((Math.random() * (5 - 3) + 3).toFixed(1)),
      count: Math.floor(Math.random() * 500) + 50,
    },
  }
}

const data: { products: Product[] } = {
  products: Array.from({ length: 30 }, (_, index) => generateRandomProduct(index)),
}

export default data
