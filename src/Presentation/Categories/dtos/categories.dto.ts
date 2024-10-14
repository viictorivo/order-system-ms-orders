import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoriesDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  categoryID: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  type: string;
}
