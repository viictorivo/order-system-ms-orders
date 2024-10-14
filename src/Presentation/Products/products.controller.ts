import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/Application/services/products.service';
import { Roles } from 'src/Infrastructure/Guard/decorators/roles.decorator';
import { ProductsDto } from './dtos/products.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async getByID(@Param('id') id: number) {
    try {
      const products = await this.productsService.getById(Number(id));
      return products;
    } catch (err) {
      throw new ConflictException(err?.message ?? 'Product could not be list');
    }
  }

  @Post()
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async save(@Body() dto: ProductsDto) {
    try {
      const products = await this.productsService.create(dto);
      return products;
    } catch (err) {
      throw new ConflictException(
        err?.message ?? 'Product could not be created',
      );
    }
  }

  @Patch()
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async update(@Body() dto: ProductsDto) {
    try {
      const products = await this.productsService.update(dto);
      return products;
    } catch (err) {
      throw new ConflictException(
        err?.message ?? 'Product could not be updated',
      );
    }
  }

  @Delete(':id')
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async delete(@Param('id') id: number) {
    try {
      const products = await this.productsService.delete(Number(id));
      return products;
    } catch (err) {
      throw new ConflictException(
        err?.message ?? 'Product could not be deleted',
      );
    }
  }
}
