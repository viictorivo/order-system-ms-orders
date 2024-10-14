import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/Domain/Enums/status';

export class OrdersTrackingDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  salesOrderID: string;

  @ApiProperty()
  @IsDefined()
  @IsEnum(Status)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  orderID: number;
}
