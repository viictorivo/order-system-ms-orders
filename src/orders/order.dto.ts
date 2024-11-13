import {
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
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
    
    @IsOptional()
    @IsNumber()
    amount: number;

  }
  