import { Provider } from '@nestjs/common';

// ENUM
import { CategoryProvidersEnum } from './enums/category-providers.enum';

// SERVICES
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

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
