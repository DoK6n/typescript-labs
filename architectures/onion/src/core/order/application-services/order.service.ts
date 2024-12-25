import { Inject, Injectable } from '@nestjs/common'
import { Order } from '~/core/order/domain-model/order'
import { IOrderRepository } from '~/core/order/domain-services/order.repository.interface'
import { ORDER_REPOSITORY } from '~/core/order/domain-services/order.di-tokens'
import { IOrderService } from './order.service.interface'
import { CreateOrderDto } from './dtos'

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.insert(dto)
  }
}
