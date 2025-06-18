import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/controllers/category.controller';
import { CategoryProviders } from './shared/category.provider';

@Module({
  providers: [...CategoryProviders],
  controllers: [CategoryController]
})
export class CategoryModule {}
