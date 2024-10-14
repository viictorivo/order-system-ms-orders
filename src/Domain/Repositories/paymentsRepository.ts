import { Payments } from '../Interfaces/payments';

export abstract class PaymentsRepository {
  abstract getPaymentsById(id: number): Promise<Payments | null>;
  abstract getPaymentsByOrderId(orderID: number): Promise<Payments | null>;
  abstract updatePayment(payment: Payments): Promise<Payments>;
}
