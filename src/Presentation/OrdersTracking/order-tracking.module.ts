import { Module } from '@nestjs/common';

import { OrdersTrackingService } from 'src/Application/services/ordersTracking.service';
import { OrdersTrackingAdapter } from 'src/Domain/Adapters/ordersTracking.adapter';
import { OrdersTrackingRepository } from 'src/Domain/Repositories/ordersTrackingRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { OrdersTrackingController } from './order-tracking.controller';

@Module({
  imports: [],
  controllers: [OrdersTrackingController],
  providers: [
    { provide: OrdersTrackingRepository, useClass: OrdersTrackingAdapter },
    OrdersTrackingService,
    PrismaService,
  ],
})
export class OrderTrackingModule {}
