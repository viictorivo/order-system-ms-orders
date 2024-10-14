import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { OrdersTrackingService } from 'src/Application/services/ordersTracking.service';
import { Roles } from 'src/Infrastructure/Guard/decorators/roles.decorator';
import { OrdersTrackingDto } from './dtos/order-tracking.dto';

@ApiTags('Tracking do Pedido')
@Controller('ordersTracking')
export class OrdersTrackingController {
  constructor(private readonly ordersTrackingService: OrdersTrackingService) {}

  @Get()
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async getAll() {
    try {
      const tracking = await this.ordersTrackingService.getAll();
      return tracking;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Order Tracking could not be list',
      );
    }
  }

  @Get(':id')
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async getByID(@Param('id') id: number) {
    try {
      const tracking = await this.ordersTrackingService.getById(Number(id));
      return tracking;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Order Tracking could not be list',
      );
    }
  }

  @Patch()
  @ApiHeader({
    name: 'user',
    description: 'ID do usuário ADMIN',
  })
  @Roles(['admin'])
  async update(@Body() dto: OrdersTrackingDto) {
    try {
      const tracking = await this.ordersTrackingService.update(dto);
      return tracking;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Order Tracking could not be updated',
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
      const tracking = await this.ordersTrackingService.delete(Number(id));
      return tracking;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Order Tracking could not be deleted',
      );
    }
  }
}
