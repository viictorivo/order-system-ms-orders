import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductsDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  priceUnit: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  categoryID: number;
}
