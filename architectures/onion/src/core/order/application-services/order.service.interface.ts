import { Order } from '~/core/order/domain-model/order'
import { CreateOrderDto } from './dtos'

export interface IOrderService {
  createOrder(dto: CreateOrderDto): Promise<Order>
}
