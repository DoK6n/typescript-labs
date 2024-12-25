import { Module } from '@nestjs/common'
import { OrderService } from '~/core/order/application-services/order.service'
import {
  ORDER_REPOSITORY,
  ORDER_SERVICE,
} from '~/core/order/domain-services/order.di-tokens'
import { OrderMapper } from '~/infrastructure/database/order/order.mapper'
import { OrderRepository } from '~/infrastructure/database/order/order.repository'
import { OrderItemMapper } from '~/infrastructure/database/order-item/order-item.mapper'
import { useClass, useFactory } from '../common/module.helper'
import { OrderController } from './order.controller'

@Module({
  imports: [
    // Database module goes here
  ],
  controllers: [OrderController],
  providers: [
    useClass(ORDER_SERVICE, OrderService),
    useFactory(ORDER_REPOSITORY, OrderRepository, [OrderMapper]),
    OrderMapper,
    OrderItemMapper,
  ],
})
export class OrderModule {}
