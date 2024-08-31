/** 상품 인터페이스 */
export interface Product {
  id: string
  name: string
  price: number
}

/** 장바구니 아이템 인터페이스 */
export interface CartItem {
  product: Product
  quantity: number
}

/** 할인 쿠폰 인터페이스 */
export interface Coupon {
  code: string
  discountPercentage: number
}
