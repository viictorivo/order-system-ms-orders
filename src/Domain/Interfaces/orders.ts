import { OrderItens } from './orderItens';
import { OrdersTracking } from './ordersTracking';
import { Payments } from './payments';

export interface Orders {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  salesOrderID: string;
  amount: number;
  customerID: number;
  orderItens: OrderItens[];
  payments: Payments[];
  orderTracking: OrdersTracking[];
}

export interface AllOrdersToday {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  salesOrderID: string;
  amount: number;
  customerID: number;
  orderItens: OrderItens[];
  orderTracking: OrdersTracking[];
}
