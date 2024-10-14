import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderItensDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  priceUnit: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  productID: number;

  @IsOptional()
  @IsNumber()
  orderID: number;
}
