import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import { Category } from '../../domain/entities/category.entity';

import { ICategoryRepository } from '../../domain/repositories/category-repository.interface';

import { CreateCategoryDTO } from '../../presentation/dtos/create-category.dto';
import { GetCategoriesQueryDTO } from '../../presentation/dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from '../../presentation/dtos/update-category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async create(data: CreateCategoryDTO, userId: string): Promise<Category> {
        return await this.prismaService.category.create({ data: {...data, userId } });
    }

    public async getById(categoryId: string, userId: string): Promise<Category | null> {
        return await this.prismaService.category.findFirst({
            where: {
                id: categoryId,
                userId,
            }
        });
    }

    public async getAllOrFilter(payload: GetCategoriesQueryDTO, userId: string): Promise<Category[]> {
        return await this.prismaService.category.findMany({
            where: payload.name ? { name: payload.name, userId } : { userId },
        });
    }

    public async update(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<Category> {
        return await this.prismaService.category.update({
            where: {
                id: categoryId,
                userId,
            },
            data: payload,
        });
    }

    public async delete(categoryId: string, userId: string): Promise<Category> {
        return await this.prismaService.category.delete({
            where: {
                id: categoryId,
                userId,
            }
        });
    }
}
