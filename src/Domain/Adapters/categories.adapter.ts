import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Infrastructure/Apis/prisma.service';
import { Categories } from '../Interfaces/categories';
import { ProductsByCategory } from '../Interfaces/productsByCategory';
import { CategoriesRepository } from '../Repositories/categoriesRepository';

@Injectable()
export class CategoriesAdapter implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async getCategoriesById(id: number): Promise<Categories | null> {
    try {
      return await this.prisma.categories.findUnique({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async getProductByCategoryID(
    categoryID: number,
  ): Promise<ProductsByCategory | null> {
    try {
      return await this.prisma.categories.findFirst({
        where: { id: categoryID },
        select: { Products: true },
      });
    } catch (error) {
      const message =
        error?.message || error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async saveCategories(categories: Categories): Promise<Categories> {
    try {
      return await this.prisma.categories.create({ data: categories });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async updateCategories(category: Categories): Promise<Categories> {
    try {
      return await this.prisma.categories.update({
        where: {
          id: category.id,
        },
        data: category,
      });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }

  async deleteCategoriesById(id: number): Promise<Categories> {
    try {
      return await this.prisma.categories.delete({ where: { id } });
    } catch (error) {
      const message = error?.meta?.target || error?.meta?.details;
      throw new Error(message);
    }
  }
}
