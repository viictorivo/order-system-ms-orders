import { Module } from '@nestjs/common';

import { CategoriesService } from 'src/Application/services/categories.service';
import { CategoriesAdapter } from 'src/Domain/Adapters/categories.adapter';
import { CategoriesRepository } from 'src/Domain/Repositories/categoriesRepository';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [
    { provide: CategoriesRepository, useClass: CategoriesAdapter },
    CategoriesService,
    PrismaService,
  ],
})
export class CategoriesModule {}
