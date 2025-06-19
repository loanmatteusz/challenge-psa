import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionProviders } from './transaction.provider';

@Module({
  providers: [TransactionService, ...TransactionProviders],
  controllers: [TransactionController]
})
export class TransactionModule {}
