import { OrderItemEntity } from '../order-item/order-item.entity'
import { OrderStatus } from '~/core/order/domain-model/order-status.constant'

export class OrderEntity {
  id: string
  userId: string
  items: OrderItemEntity[]
  status: OrderStatus
  createdAt: string
}
