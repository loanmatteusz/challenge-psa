import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CategoryDTO } from './/dtos/category.dto';

import { CreateCategoryDTO } from './dtos/create-category.dto';
import { GetCategoriesQueryDTO } from './dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoryRepository {

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async create(data: CreateCategoryDTO, userId: string): Promise<CategoryDTO> {
        return await this.prismaService.category.create({ data: {...data, userId } });
    }

    public async getById(categoryId: string, userId: string): Promise<CategoryDTO | null> {
        return await this.prismaService.category.findFirst({
            where: {
                id: categoryId,
                userId,
            }
        });
    }

    public async getAllOrFilter(payload: GetCategoriesQueryDTO, userId: string): Promise<CategoryDTO[]> {
        return await this.prismaService.category.findMany({
            where: payload.name ? { name: payload.name, userId } : { userId },
        });
    }

    public async update(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<CategoryDTO> {
        return await this.prismaService.category.update({
            where: {
                id: categoryId,
                userId,
            },
            data: payload,
        });
    }

    public async delete(categoryId: string, userId: string): Promise<CategoryDTO> {
        return await this.prismaService.category.delete({
            where: {
                id: categoryId,
                userId,
            }
        });
    }
}
