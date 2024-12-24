import { Order } from '~/core/domain-model/order'

export interface IOrderRepository {
  insert(order: Pick<Order, 'userId' | 'items' | 'status'>): Promise<Order>
}
