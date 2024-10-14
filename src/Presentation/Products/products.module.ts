import { Module } from '@nestjs/common';
import { ProductsService } from 'src/Application/services/products.service';
import { ProductsAdapter } from 'src/Domain/Adapters/products.adapter';

import { ProductsRepository } from 'src/Domain/Repositories/productsRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    { provide: ProductsRepository, useClass: ProductsAdapter },
    ProductsService,
    PrismaService,
  ],
})
export class ProductsModule {}
