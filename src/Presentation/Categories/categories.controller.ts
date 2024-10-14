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
import { CategoriesService } from 'src/Application/services/categories.service';
import { Roles } from 'src/Infrastructure/Guard/decorators/roles.decorator';
import { CategoriesDto } from './dtos/categories.dto';

@ApiTags('Categorias')
@ApiHeader({
  name: 'user',
  description: 'ID do usuário ADMIN',
})
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  @Roles(['admin'])
  async getCategoriesByID(@Param('id') id: number) {
    try {
      const categories = await this.categoriesService.getById(Number(id));
      return categories;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Categories could not be list',
      );
    }
  }

  @Get(':categoryID')
  @Roles(['admin'])
  async getProductByCategoryID(@Param('categoryID') categoryID: number) {
    try {
      const categories =
        await this.categoriesService.getProductByCategoryID(categoryID);
      return categories;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Categories could not be list',
      );
    }
  }

  @Post()
  @Roles(['admin'])
  async saveCategories(@Body() dto: CategoriesDto) {
    try {
      const categories = await this.categoriesService.create(dto);
      return categories;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Categories could not be created',
      );
    }
  }

  @Patch()
  @Roles(['admin'])
  async updateCategories(@Body() dto: CategoriesDto) {
    try {
      const categories = await this.categoriesService.update(dto);
      return categories;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Categories could not be created',
      );
    }
  }

  @Delete(':id')
  @Roles(['admin'])
  async deleteCategories(@Param('id') id: number) {
    try {
      const categories = await this.categoriesService.delete(Number(id));
      return categories;
    } catch (err) {
      throw new NotFoundException(
        err?.message ?? 'Categories could not be created',
      );
    }
  }
}
