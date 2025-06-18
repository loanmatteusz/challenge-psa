import { Module } from '@nestjs/common';
import { TransactionService } from './application/services/transaction.service';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { TransactionProviders } from './shared/transaction.provider';

@Module({
  providers: [TransactionService, ...TransactionProviders],
  controllers: [TransactionController]
})
export class TransactionModule {}
