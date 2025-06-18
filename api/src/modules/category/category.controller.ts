import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CategoryProvidersEnum } from './enums/category-providers.enum';
import { ICategoryService } from './interfaces/category-service.interface';
import { CategoryDTO } from './dtos/category.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { IUserRequest } from '../auth/interfaces/user-request.interface';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { GetCategoriesQueryDTO } from './dtos/get-categories-query.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@ApiTags('[CATEGORY]')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
    @Inject(CategoryProvidersEnum.CATEGORY_SERVICE)
    private readonly categoryService: ICategoryService;

    @ApiOkResponse({
        type: CategoryDTO,
        description: 'Category created successfully',
    })
    @Post()
    public async createCategory(@CurrentUser() { id }: IUserRequest, @Body() data: CreateCategoryDTO) {
        return await this.categoryService.createCategory(data, id);
    }

    @ApiOkResponse({
        type: CategoryDTO,
        description: 'Category fetched successfully',
    })
    @Get()
    public async getCategories(@CurrentUser() { id }: IUserRequest, @Query() query: GetCategoriesQueryDTO) {
        return await this.categoryService.getCategories(query, id);
    }

    @ApiOkResponse({
        type: CategoryDTO,
        description: 'Category fetched successfully',
    })
    @Get(":id")
    public async getCategory(@CurrentUser() { id }: IUserRequest, @Param("id") categoryId: string) {
        return await this.categoryService.getCategoryById(categoryId, id);
    }

    @ApiOkResponse({
        type: CategoryDTO,
        description: 'Category updated successfully',
    })
    @Put(":id")
    public async updateCategory(
        @CurrentUser() { id }: IUserRequest,
        @Param("id") categoryId: string,
        @Body() payload: UpdateCategoryDTO,
    ) {
        return await this.categoryService.updateCategory(categoryId, payload, id);
    }

    @ApiOkResponse({
        type: CategoryDTO,
        description: 'Category deleted successfully',
    })
    @Delete(":id")
    public async deleteCategory(
        @CurrentUser() { id }: IUserRequest,
        @Param("id") categoryId: string,
    ) {
        return await this.categoryService.deleteCategory(categoryId, id);
    }
}
