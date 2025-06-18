import { Category } from '../entities/category.entity';

// DTOs
import { GetCategoriesQueryDTO } from '../../presentation/dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from '../../presentation/dtos/update-category.dto';
import { CreateCategoryDTO } from '../../presentation/dtos/create-category.dto';

export interface ICategoryService {
	createCategory(data: CreateCategoryDTO, userId: string): Promise<Category>;
	getCategoryById(categoryId: string, userId: string): Promise<Category>;
	getCategories(payload: GetCategoriesQueryDTO, userId: string): Promise<Category[]>;
	updateCategory(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<Category>;
	deleteCategory(categoryId: string, userId: string): Promise<Category>;
}
