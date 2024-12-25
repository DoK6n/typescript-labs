import { Module } from '@nestjs/common'
import { OrderModule } from '~/ui/order/order.module'
import { AppController } from './app.controller'

@Module({
  imports: [OrderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
