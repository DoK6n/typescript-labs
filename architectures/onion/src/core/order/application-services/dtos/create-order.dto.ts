import { tags } from 'typia'
import { OrderItem } from '~/core/order/domain-model/order-item'
import { OrderStatus } from '~/core/order/domain-model/order-status.constant'

export interface CreateOrderDto {
  userId: string & tags.Format<'uuid'>
  items: OrderItem[]
  status: OrderStatus
}
