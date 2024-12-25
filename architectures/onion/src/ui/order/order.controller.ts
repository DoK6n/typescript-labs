import { Controller, Inject } from '@nestjs/common'
import { TypedBody, TypedRoute } from '@nestia/core'
import { CreateOrderDto } from '~/core/order/application-services/dtos'
import { IOrderService } from '~/core/order/application-services/order.service.interface'
import { ORDER_SERVICE } from '~/core/order/domain-services/order.di-tokens'
import { Order } from '~/core/order/domain-model/order'
import { BaseResponse } from '../common/base-response'

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
  ) {}

  @TypedRoute.Get()
  async getOrders() {
    return new BaseResponse({
      data: [
        {
          productId: 'p-1',
          price: 10000,
          quantity: 10,
        },
        {
          productId: 'p-2',
          price: 30000,
          quantity: 20,
        },
      ],
    })
  }

  @TypedRoute.Post()
  async createOrder(
    @TypedBody() dto: CreateOrderDto,
  ): Promise<BaseResponse<Order>> {
    const order = await this.orderService.createOrder(dto)
    return new BaseResponse({ data: order })
  }
}
