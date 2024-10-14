import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { Payments } from '../Interfaces/payments';
import { PaymentsRepository } from '../Repositories/paymentsRepository';

@Injectable()
export class PaymentsAdapter implements PaymentsRepository {
  constructor(private prisma: PrismaService) {}

  async getPaymentsById(id: number): Promise<Payments | null> {
    try {
      return await this.prisma.payments.findUnique({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async getPaymentsByOrderId(orderID: number): Promise<Payments | null> {
    try {
      return await this.prisma.payments.findFirst({
        where: { orderID: orderID },
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async updatePayment(payments: Payments): Promise<Payments> {
    try {
      return await this.prisma.payments.update({
        where: {
          id: payments.id,
        },
        data: {
          ...payments,
        },
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new BadRequestException(message);
    }
  }
}
