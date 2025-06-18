import { Provider } from '@nestjs/common';

// ENUM
import { CategoryProvidersEnum } from './enums/category-providers.enum';

// SERVICES
import { CategoryService } from '../application/services/category.service';
import { CategoryRepository } from '../infrastructure/repositories/category.repository';

export const CategoryProviders: Provider[] = [
    {
        provide: CategoryProvidersEnum.CATEGORY_SERVICE,
        useClass: CategoryService,
    },
    {
        provide: CategoryProvidersEnum.CATEGORY_REPOSITORY,
        useClass: CategoryRepository,
    },
];
