import { OrderItemEntity } from '../order-item/order-item.entity'
import { OrderStatus } from '~/core/domain-model/order-status.constant'

export class OrderEntity {
  id: string
  userId: string
  items: OrderItemEntity[]
  status: OrderStatus
  createdAt: string
}
