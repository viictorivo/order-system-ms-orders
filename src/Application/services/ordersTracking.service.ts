import { Injectable } from '@nestjs/common';
import { OrdersTracking } from 'src/Domain/Interfaces/ordersTracking';
import { OrdersTrackingRepository } from 'src/Domain/Repositories/ordersTrackingRepository';

@Injectable()
export class OrdersTrackingService {
  constructor(
    private readonly ordersTrackingRepository: OrdersTrackingRepository,
  ) {}

  async getById(id: number): Promise<OrdersTracking | null> {
    return this.ordersTrackingRepository.getTrackingById(id);
  }

  async getAll(): Promise<OrdersTracking[] | null> {
    return this.ordersTrackingRepository.getTrackingAll();
  }

  async update(tracking: OrdersTracking): Promise<OrdersTracking> {
    return this.ordersTrackingRepository.updateTracking(tracking);
  }

  async delete(id: number): Promise<OrdersTracking> {
    return this.ordersTrackingRepository.deleteTracking(id);
  }
}
