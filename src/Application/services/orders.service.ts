import { Injectable } from '@nestjs/common';
import { AllOrdersToday, Orders } from 'src/Domain/Interfaces/orders';
import { OrdersRepository } from 'src/Domain/Repositories/ordersRepository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getById(id: number): Promise<Orders | null> {
    return this.ordersRepository.getOrderById(id);
  }

  async getOrdersToday(): Promise<AllOrdersToday[] | null> {
    return this.ordersRepository.getOrdersToday();
  }

  async create(order: Orders): Promise<Orders> {
    return this.ordersRepository.saveOrder(order);
  }

  async update(order: Orders): Promise<Orders> {
    return this.ordersRepository.updateOrder(order);
  }

  async delete(id: number): Promise<Orders> {
    return this.ordersRepository.deleteOrder(id);
  }
}
