import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryProviders } from './category.provider';

@Module({
  providers: [...CategoryProviders],
  controllers: [CategoryController]
})
export class CategoryModule {}
