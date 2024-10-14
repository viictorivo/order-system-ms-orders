import { Module } from '@nestjs/common';

import { CustomerService } from 'src/Application/services/customer.service';
import { CustomersAdapter } from 'src/Domain/Adapters/customers.adapter';
import { CustomersRepository } from 'src/Domain/Repositories/customersRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { CustomersController } from './customers.controller';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [
    { provide: CustomersRepository, useClass: CustomersAdapter },
    PrismaService,
    CustomerService,
  ],
  exports: [CustomerService],
})
export class CustomersModule {}
