export interface OrdersTracking {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  salesOrderID: string;
  status?: string;
  orderID?: number;
  waitingTime?: number;
}
