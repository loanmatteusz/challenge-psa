import { Provider } from '@nestjs/common';

// ENUM
import { CategoryProvidersEnum } from './enums/category-providers.enum';

// SERVICES
import { CategoryService } from './category.service';

export const CategoryProviders: Provider[] = [
    {
        provide: CategoryProvidersEnum.CATEGORY_SERVICE,
        useClass: CategoryService,
    },
];
