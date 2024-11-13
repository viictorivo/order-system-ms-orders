import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrdersService } from './orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrderRepository])],
    providers: [OrdersService],
})

@Module({})
export class OrdersModule {}
