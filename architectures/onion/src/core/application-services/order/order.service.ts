import { Order } from 'src/core/domain-model/order'
import { IOrderService } from './order.service.interface'
import { IOrderRepository } from 'src/core/domain-services/order.repository.interface'
import { CreateOrderDto } from './dtos'
import { Inject, Injectable } from '@nestjs/common'
import { ORDER_REPOSITORY } from '~/core/domain-services/order.di-tokens'

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
