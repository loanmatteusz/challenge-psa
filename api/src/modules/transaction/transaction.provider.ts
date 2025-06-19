import { Provider } from '@nestjs/common';

// ENUM
import { TransactionProvidersEnum } from './enums/transaction-providers.enum';

// SERVICES
import { TransactionService } from './transaction.service';

// REPOSITORIES
import { TransactionRepository } from './transaction.repository';

export const TransactionProviders: Provider[] = [
    {
        provide: TransactionProvidersEnum.TRANSACTION_SERVICE,
        useClass: TransactionService,
    },
    {
        provide: TransactionProvidersEnum.TRANSACTION_REPOSITORY,
        useClass: TransactionRepository,
    },
];
