import { OrdersTracking } from '../Interfaces/ordersTracking';

export abstract class OrdersTrackingRepository {
  abstract getTrackingById(id: number): Promise<OrdersTracking | null>;
  abstract getTrackingAll(): Promise<OrdersTracking[] | null>;
  abstract updateTracking(tracking: OrdersTracking): Promise<OrdersTracking>;
  abstract deleteTracking(id: number): Promise<OrdersTracking>;
}
