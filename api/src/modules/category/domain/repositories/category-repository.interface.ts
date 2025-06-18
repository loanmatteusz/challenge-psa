import { Category } from '../entities/category.entity';

// DTOs
import { GetCategoriesQueryDTO } from '../../presentation/dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from '../../presentation/dtos/update-category.dto';
import { CreateCategoryDTO } from '../../presentation/dtos/create-category.dto';

export interface ICategoryRepository {
    create(data: CreateCategoryDTO, userId: string): Promise<Category>;
    getById(categoryId: string, userId: string): Promise<Category | null>;
    getAllOrFilter(payload: GetCategoriesQueryDTO, userId: string): Promise<Category[]>;
    update(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<Category>;
    delete(categoryId: string, userId: string): Promise<Category>;
}
