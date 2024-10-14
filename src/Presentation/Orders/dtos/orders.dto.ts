import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrdersTrackingDto } from '../../OrdersTracking/dtos/order-tracking.dto';
import { PaymentsDto } from '../../Payments/dtos/payments.dto';
import { OrderItensDto } from './orders-itens.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrdersDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  salesOrderID: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  customerID: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsArray()
  orderItens: OrderItensDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  payments: PaymentsDto[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  orderTracking: OrdersTrackingDto[];
}
