import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICategoryService } from './interfaces/category-service.interface';
import { CategoryDTO } from './dtos/category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { GetCategoriesQueryDTO } from './dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
    private readonly logger: Logger = new Logger(CategoryService.name);

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async createCategory(data: CreateCategoryDTO, userId: string): Promise<CategoryDTO> {
        this.logger.log('Create User');
        if (!data.name.trim()) {
            throw new BadRequestException("You can't create a category with no name");
        }
        return await this.prismaService.category.create({ data: {...data, userId } });
    }

    public async getCategoryById(categoryId: string, userId: string): Promise<CategoryDTO> {
        this.logger.log('Get Category By Id');
        const category = await this.prismaService.category.findFirst({
            where: {
                id: categoryId,
                userId,
            }
        });

        if (!category) {
            throw new BadRequestException("Category has not found");
        }

        return category;
    }

    public async getCategories(payload: GetCategoriesQueryDTO, userId: string): Promise<CategoryDTO[]> {
        const categories = await this.prismaService.category.findMany({
            where: payload.name ? { name: payload.name, userId } : { userId },
        });

        return categories;
    }

    public async updateCategory(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<CategoryDTO> {
        const categoryUpdated = await this.prismaService.category.update({
            where: {
                id: categoryId,
                userId,
            },
            data: payload,
        });

        return categoryUpdated;
    }

    public async deleteCategory(categoryId: string, userId: string): Promise<CategoryDTO> {
        const categoryDeleted = await this.prismaService.category.delete({
            where: {
                id: categoryId,
                userId,
            }
        });

        return categoryDeleted;
    }
}
