import { AllOrdersToday, Orders } from '../Interfaces/orders';

export abstract class OrdersRepository {
  abstract getOrderById(id: number): Promise<Orders | null>;
  abstract getOrdersToday(): Promise<AllOrdersToday[] | null>;
  abstract saveOrder(order: Orders): Promise<Orders>;
  abstract updateOrder(order: Orders): Promise<Orders>;
  abstract deleteOrder(id: number): Promise<Orders>;
}
