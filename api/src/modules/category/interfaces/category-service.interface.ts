// DTOs
import { GetCategoriesQueryDTO } from '../dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from '../dtos/update-category.dto';
import { CategoryDTO } from '../dtos/category.dto';
import { CreateCategoryDTO } from '../dtos/create-category.dto';

export interface ICategoryService {
	createCategory(data: CreateCategoryDTO, userId: string): Promise<CategoryDTO>;
	getCategoryById(categoryId: string, userId: string): Promise<CategoryDTO>;
	getCategories(payload: GetCategoriesQueryDTO, userId: string): Promise<CategoryDTO[]>;
	updateCategory(categoryId: string, payload: UpdateCategoryDTO, userId: string): Promise<CategoryDTO>;
	deleteCategory(categoryId: string, userId: string): Promise<CategoryDTO>;
}
