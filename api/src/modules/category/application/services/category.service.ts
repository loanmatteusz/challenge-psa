import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';

import { ICategoryService } from '../../domain/services/category-service.interface';

import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { CreateCategoryDTO } from '../../presentation/dtos/create-category.dto';
import { GetCategoriesQueryDTO } from '../../presentation/dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from '../../presentation/dtos/update-category.dto';
import { CategoryProvidersEnum } from '../../shared/enums/category-providers.enum';

@Injectable()
export class CategoryService implements ICategoryService {
    private readonly logger: Logger = new Logger(CategoryService.name);

    @Inject(CategoryProvidersEnum.CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository;

    public async createCategory(data: CreateCategoryDTO, userId: string): Promise<Category> {
        this.logger.log('Creating a Category');
        if (!data.name.trim()) {
            throw new BadRequestException("You can't create a category with no name");
        }
        return await this.categoryRepository.create(data, userId);
    }

    public async getCategoryById(categoryId: string, userId: string): Promise<Category> {
        this.logger.log('Getting a Category By Id');
        const category = await this.categoryRepository.getById(categoryId, userId);
        if (!category) {
            throw new BadRequestException("Category has not found");
        }
        return category;
    }

    public async getCategories(payload: GetCategoriesQueryDTO, userId: string): Promise<Category[]> {
        this.logger.log('Getting many Categories By Filter');
        return await this.categoryRepository.getAllOrFilter(payload, userId);
    }

    public async updateCategory(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<Category> {
        this.logger.log('Updating a Category By Id');
        return await this.categoryRepository.update(categoryId, payload, userId);
    }

    public async deleteCategory(categoryId: string, userId: string): Promise<Category> {
        this.logger.log('Deleting a Category By Id');
        return await this.categoryRepository.delete(categoryId, userId);
    }
}
