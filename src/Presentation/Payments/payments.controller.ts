import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';

import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from 'src/Application/services/payments.service';
import { Roles } from 'src/Infrastructure/Guard/decorators/roles.decorator';
import { PaymentsDto } from './dtos/payments.dto';

@ApiTags('Pagamentos')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':id')
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async getByID(@Param('id') id: number) {
    try {
      const payments = await this.paymentsService.getById(Number(id));
      return payments;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Payments could not be list');
    }
  }

  @Get(':orderID')
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async getPaymentsByOrderId(@Param('orderID') orderID: number) {
    try {
      const payments = await this.paymentsService.getPaymentsByOrderId(
        Number(orderID),
      );
      return payments;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Payments could not be list');
    }
  }

  @Patch()
  async postPayments(@Body() dto: PaymentsDto) {
    try {
      const payment = await this.paymentsService.update(dto);
      return payment;
    } catch (err) {
      throw new NotFoundException('Order payment be created');
    }
  }
}
