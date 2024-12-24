import { Order } from '~/core/domain-model/order'
import { CreateOrderDto } from './dtos'

export interface IOrderService {
  createOrder(dto: CreateOrderDto): Promise<Order>
}
