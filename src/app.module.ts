import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { OrdersModule } from './orders/order.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
