import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaService } from './Infrastructure/Apis/prisma.service';
import { QRCodeService } from './Infrastructure/Apis/qrcode.service';
import { RolesGuard } from './Infrastructure/Guard/roles.guard';
import { CategoriesModule } from './Presentation/Categories/categories.module';
import { CustomersModule } from './Presentation/Customers/customers.module';
import { HealthModule } from './Presentation/Health/health.module';
import { OrdersModule } from './Presentation/Orders/orders.module';
import { OrderTrackingModule } from './Presentation/OrdersTracking/order-tracking.module';
import { PaymentsModule } from './Presentation/Payments/payments.module';
import { ProductsModule } from './Presentation/Products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: true,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    HttpModule,
    HealthModule,
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
    OrderTrackingModule,
  ],
  providers: [
    PrismaService,
    QRCodeService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
  controllers: [],
})
export class AppModule {}
