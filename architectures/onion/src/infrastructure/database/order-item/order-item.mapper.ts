import { OrderItem } from '~/core/order/domain-model/order-item'
import { OrderItemEntity } from './order-item.entity'
import { IMapper } from '~/infrastructure/common/mapper.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderItemMapper implements IMapper<OrderItemEntity, OrderItem> {
  toDomain(entity: OrderItemEntity): OrderItem {
    return new OrderItem({
      productId: entity.productId,
      price: entity.price,
      quantity: entity.quantity,
    })
  }

  toPersistence(domain: OrderItem): OrderItemEntity {
    return {
      productId: domain.productId,
      price: domain.price,
      quantity: domain.quantity,
    }
  }
}
