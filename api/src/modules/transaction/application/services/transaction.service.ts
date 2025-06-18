import { ForbiddenException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionService } from '../../domain/services/transaction-service.interface';

import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';

import { CreateTransactionDTO } from '../../presentation/dtos/create-transaction.dto';
import { GetTransactionsQueryDTO } from '../../presentation/dtos/get-transactions-query.dto';
import { UpdateTransactionDTO } from '../../presentation/dtos/update-transaction.dto';
import { TransactionProvidersEnum } from '../../shared/enums/transaction-providers.enum';

@Injectable()
export class TransactionService implements ITransactionService {
    private readonly logger: Logger = new Logger(TransactionService.name);

    @Inject(TransactionProvidersEnum.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository;

    public async createTransaction(data: CreateTransactionDTO, userId: string): Promise<Transaction> {
        this.logger.log("Create Transaction");
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.create(data, userId);
    }

    public async getTransactionById(transactionId: string, userId: string): Promise<Transaction> {
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.getById(transactionId, userId);
    }

    public async getTransactions(payload: GetTransactionsQueryDTO, userId: string): Promise<Transaction[]> {
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.getAllOrFilter(payload, userId);
    }

    public async updateTransaction(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<Transaction> {
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        const transactionUpdated = await this.transactionRepository.update(transactionId, payload, userId);
        if (transactionUpdated.userId !== userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return transactionUpdated;
    }

    public async deleteTransaction(transactionId: string, userId: string): Promise<Transaction> {
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        const transaction = await this.transactionRepository.getById(transactionId, userId);
        if (!transaction) {
            throw new NotFoundException("Transaction Not Found");
        }
        return await this.transactionRepository.delete(transactionId, userId);
    }
}
