import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { OrdersService } from 'src/Application/services/orders.service';
import { Roles } from 'src/Infrastructure/Guard/decorators/roles.decorator';
import { OrdersDto } from './dtos/orders.dto';

@ApiTags('Pedido')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getByID(@Param('id') id: number) {
    try {
      const order = await this.ordersService.getById(Number(id));
      return order;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Order could not be list');
    }
  }

  @Get()
  async getOrdersToday() {
    try {
      const order = await this.ordersService.getOrdersToday();
      return order;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Order could not be list');
    }
  }

  @Post()
  async save(@Body() dto: OrdersDto) {
    try {
      const order = await this.ordersService.create(dto);
      return order;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Order could not be created');
    }
  }

  @Patch()
  async update(@Body() dto: OrdersDto) {
    try {
      const order = await this.ordersService.update(dto);
      return order;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Order could not be updated');
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
      const products = await this.ordersService.delete(Number(id));
      return products;
    } catch (err) {
      throw new NotFoundException(err?.message ?? 'Order could not be deleted');
    }
  }
}
