import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { OrderModule } from '~/ui/order/order.module'

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
