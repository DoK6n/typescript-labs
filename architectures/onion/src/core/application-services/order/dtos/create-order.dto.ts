import { OrderItem } from '~/core/domain-model/order-item'
import { OrderStatus } from '~/core/domain-model/order-status.constant'
import { tags } from 'typia'

export interface CreateOrderDto {
  userId: string & tags.Format<'uuid'>
  items: OrderItem[]
  status: OrderStatus
}
