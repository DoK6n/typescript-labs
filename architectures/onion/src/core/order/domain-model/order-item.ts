export class OrderItem {
  productId: string
  price: number
  quantity: number

  constructor(props: { productId: string; price: number; quantity: number }) {
    this.productId = props.productId
    this.price = props.price
    this.quantity = props.quantity
  }
}
