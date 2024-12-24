import { Order } from '~/core/domain-model/order'
import { OrderEntity } from './order.entity'
import { OrderItemMapper } from '../order-item/order-item.mapper'
import { IMapper } from '~/infrastructure/common/mapper.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderMapper implements IMapper<OrderEntity, Order> {
  constructor(private readonly orderItemMapper: OrderItemMapper) {}

  toDomain(entity: OrderEntity): Order {
    return new Order({
      id: entity.id,
      userId: entity.userId,
      items: entity.items.map(this.orderItemMapper.toDomain),
      status: entity.status,
      createdAt: entity.createdAt,
    })
  }

  toPersistence(domain: Order): OrderEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      items: domain.items.map(this.orderItemMapper.toPersistence),
      status: domain.status,
      createdAt: domain.createdAt,
    }
  }
}
