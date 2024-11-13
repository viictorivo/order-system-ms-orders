import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrdersDto } from './order.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async createOrder(
        createUserDto: OrdersDto,
      ): Promise<Order> {
        const { salesOrderID, amount } = createUserDto;
    
        const order = this.create();
        order.salesOrderID = salesOrderID;
        order.amount = amount;
      
        try {
          await order.save();
          return order;
        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('Ordem já existe');
          } else {
            throw new InternalServerErrorException(
              'Erro ao salvar o usuário no banco de dados',
            );
          }
        }
      }
}