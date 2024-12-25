import { OrderItem } from './order-item'
import { OrderStatus } from './order-status.constant'

export class Order {
  id: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  createdAt: string

  constructor(props: {
    id: string
    userId: string
    items: OrderItem[]
    status: OrderStatus
    createdAt: string
  }) {
    this.id = props.id
    this.userId = props.userId
    this.items = props.items
    this.status = props.status
    this.createdAt = props.createdAt
  }

  getTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  updateStatus(status: OrderStatus) {
    this.status = status
  }
}
