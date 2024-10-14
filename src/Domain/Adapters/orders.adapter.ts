import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { format } from 'date-fns';
import { Status } from 'src/Domain/Enums/status';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { QRCodeService } from 'src/Infrastructure/Apis/qrcode.service';
import { ConfirmPaymentEvent } from 'src/Infrastructure/Events/confirmPaymentEvent';
import { PaymentEvents } from '../Enums/paymentStatus';
import { AllOrdersToday, Orders } from '../Interfaces/orders';
import { OrdersRepository } from '../Repositories/ordersRepository';

@Injectable()
export class OrdersAdapter implements OrdersRepository {
  constructor(
    private prisma: PrismaService,
    private qrCode: QRCodeService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getOrderById(id: number): Promise<Orders | null> {
    try {
      const order = await this.prisma.orders.findUnique({
        where: { id },
        include: {
          orderItens: true,
          payments: true,
          orderTracking: true,
        },
      });
      return order;
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new BadRequestException(message);
    }
  }

  async getOrdersToday(): Promise<AllOrdersToday[] | null> {
    try {
      const dateFormatted = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z';
      const order = await this.prisma.orders.findMany({
        where: {
          createdAt: { gte: dateFormatted },
          NOT: {
            orderTracking: {
              every: {
                status: Status.FINISHED,
              },
            },
          },
        },
        include: {
          orderItens: true,
          orderTracking: true,
        },
        orderBy: [
          {
            createdAt: 'asc',
          },
        ],
      });

      return order;
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new BadRequestException(message);
    }
  }

  async saveOrder(orders: Orders): Promise<Orders> {
    try {
      let order: Orders;
      let payment: any;
      const salesOrderID = randomUUID();

      const items = orders.orderItens.map((item) => ({
        sku_number: item?.productID.toString(),
        category: 'marketplace',
        title: item?.name,
        unit_price: item?.priceUnit,
        quantity: item?.quantity,
        unit_measure: 'unit',
        total_amount: item?.quantity * item?.priceUnit,
      }));

      const body = {
        description: `QRCODE-${orders.customerID}-${new Date()}`,
        external_reference: salesOrderID,
        title: 'Teste',
        total_amount: orders?.amount,
        cash_out: {
          amount: 0,
        },
        items,
      };

      //
      const { data } = await this.qrCode.create(body);

      if (data) {
        payment = {
          salesOrderID,
          qrCode: data?.qr_data,
          inStoreOrderID: data?.in_store_order_id,
        };

        order = {
          salesOrderID: salesOrderID,
          customerID: orders?.customerID,
          amount: orders?.amount,
          orderItens: orders?.orderItens,
          payments: [payment],
          orderTracking: [{ salesOrderID }],
        };
      } else {
        throw new Error('Não gerou o QRCode de pagamento');
      }

      const response = await this.prisma.orders.create({
        data: {
          ...order,
          orderItens: { create: order.orderItens },
          payments: { create: order.payments },
          orderTracking: { create: order.orderTracking },
        },
        include: {
          orderItens: true,
          payments: true,
          orderTracking: true,
        },
      });

      // WEBHOOK PARA CONFIRMAR PAGAMENTO
      if (response?.payments.length > 0) {
        const payload = new ConfirmPaymentEvent({
          payload: response?.payments[0],
        });
        this.eventEmitter.emit(PaymentEvents.CONFIRM_PAYMENT, payload);
      }

      return response;
    } catch (error) {
      const message =
        error?.meta?.target || error?.meta?.details || error?.message;
      throw new BadRequestException(message);
    }
  }

  async updateOrder(orders: Orders): Promise<Orders> {
    try {
      return await this.prisma.orders.update({
        where: {
          id: orders.id,
        },
        data: {
          ...orders,
          orderItens: { create: orders.orderItens },
          payments: { create: orders.payments },
          orderTracking: { create: orders.orderTracking },
        },
        include: {
          orderItens: true,
          payments: true,
          orderTracking: true,
        },
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new BadRequestException(message);
    }
  }

  async deleteOrder(id: number): Promise<Orders> {
    try {
      const order = await this.prisma.orders.delete({
        where: { id },
        include: {
          orderItens: true,
          payments: true,
          orderTracking: true,
        },
      });

      return order;
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new BadRequestException(message);
    }
  }
}
