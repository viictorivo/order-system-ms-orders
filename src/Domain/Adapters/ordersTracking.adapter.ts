import { BadRequestException, Injectable } from '@nestjs/common';
import { differenceInMinutes, format } from 'date-fns';
import { Status } from 'src/Domain/Enums/status';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { OrdersTracking } from '../Interfaces/ordersTracking';
import { OrdersTrackingRepository } from '../Repositories/ordersTrackingRepository';

@Injectable()
export class OrdersTrackingAdapter implements OrdersTrackingRepository {
  constructor(private prisma: PrismaService) {}

  async getTrackingById(id: number): Promise<OrdersTracking | null> {
    try {
      return await this.prisma.orderTracking.findUnique({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async getTrackingAll(): Promise<OrdersTracking[] | null> {
    try {
      const today = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z';
      const trackingToday = await this.prisma.orderTracking.findMany({
        where: { createdAt: { gt: today } },
      });

      if (trackingToday.length > 0) {
        return trackingToday.map((order: OrdersTracking) => ({
          ...order,
          waitingTime:
            order.status === Status.FINISHED
              ? 0
              : differenceInMinutes(new Date(), order?.updatedAt ?? new Date()),
        }));
      } else {
        throw new BadRequestException(
          'Não gerou nenhum pedido na data de hoje.',
        );
      }
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async updateTracking(tracking: OrdersTracking): Promise<OrdersTracking> {
    try {
      return await this.prisma.orderTracking.update({
        where: {
          id: tracking.id,
        },
        data: tracking,
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async deleteTracking(id: number): Promise<OrdersTracking> {
    try {
      return await this.prisma.orderTracking.delete({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }
}
