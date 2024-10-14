import { Module } from '@nestjs/common';

import { PaymentsService } from 'src/Application/services/payments.service';
import { PaymentsAdapter } from 'src/Domain/Adapters/payments.adapter';
import { PaymentsRepository } from 'src/Domain/Repositories/paymentsRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { ConfirmPaymentListener } from 'src/Infrastructure/Events/listeners/confirmPayment.listener';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [],
  controllers: [PaymentsController],
  providers: [
    { provide: PaymentsRepository, useClass: PaymentsAdapter },
    PaymentsService,
    PrismaService,
    ConfirmPaymentListener,
  ],
})
export class PaymentsModule {}
