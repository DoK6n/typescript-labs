import { IOrderRepository } from '~/core/order/domain-services/order.repository.interface'
import { Order } from '~/core/order/domain-model/order'
import { OrderEntity } from './order.entity'
import { OrderMapper } from './order.mapper'

interface DatabaseClient {
  save: (entity: OrderEntity) => OrderEntity['id'] | undefined
  findById: (id: string) => OrderEntity | undefined
}

export class OrderRepository implements IOrderRepository {
  private orders = new Map<string, OrderEntity>()
  private client: DatabaseClient

  constructor(private readonly mapper: OrderMapper) {
    // 실제로는 데이터베이스를 사용하겠지만, 예제를 위해 메모리에 저장
    this.client = {
      save: (entity: OrderEntity) => {
        this.orders.set(entity.id, entity)
        return entity.id
      },
      findById: (id: string) => {
        return this.orders.get(id)
      },
    }
  }

  async insert(dto: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const id = crypto.randomUUID()

    const entity = this.mapper.toPersistence({
      id,
      ...dto,
      createdAt: new Date().toISOString(),
    })

    const savedId = this.client.save(entity)

    if (!savedId) {
      throw new Error('Failed to save order')
    }

    const order = this.client.findById(savedId)

    if (!order) {
      throw new Error('Order not found')
    }

    return this.mapper.toDomain(order)
  }
}
