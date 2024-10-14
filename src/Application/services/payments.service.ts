import { Injectable } from '@nestjs/common';
import { Payments } from 'src/Domain/Interfaces/payments';
import { PaymentsRepository } from 'src/Domain/Repositories/paymentsRepository';


@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getById(id: number): Promise<Payments | null> {
    return this.paymentsRepository.getPaymentsById(id);
  }
  async getPaymentsByOrderId(orderID: number): Promise<Payments | null> {
    return this.paymentsRepository.getPaymentsByOrderId(orderID);
  }
  async update(payment: Payments): Promise<Payments> {
    return this.paymentsRepository.updatePayment(payment);
  }
}
