import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { OrdersDto } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
      ) {}

    async createAdminUser(createOrderDto: OrdersDto): Promise<Order> {
          return this.orderRepository.createOrder(createOrderDto);
      }
}
