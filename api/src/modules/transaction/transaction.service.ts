import { ForbiddenException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { TransactionDTO } from './dtos/transaction.dto';

import { TransactionRepository } from './transaction.repository';

import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { GetTransactionsQueryDTO } from './dtos/get-transactions-query.dto';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';
import { TransactionProvidersEnum } from './enums/transaction-providers.enum';

@Injectable()
export class TransactionService {
    private readonly logger: Logger = new Logger(TransactionService.name);

    @Inject(TransactionProvidersEnum.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository;

    public async createTransaction(data: CreateTransactionDTO, userId: string): Promise<TransactionDTO> {
        this.logger.log("Creating a Transaction");
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.create(data, userId);
    }

    public async getTransactionById(transactionId: string, userId: string): Promise<TransactionDTO> {
        this.logger.log("Getting a Transaction by Id");
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.getById(transactionId, userId);
    }

    public async getTransactions(payload: GetTransactionsQueryDTO, userId: string): Promise<TransactionDTO[]> {
        this.logger.log("Creating Transactions filtered");
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return await this.transactionRepository.getAllOrFilter(payload, userId);
    }

    public async updateTransaction(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<TransactionDTO> {
        this.logger.log("Updating a Transaction");
        if (!userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        const transactionUpdated = await this.transactionRepository.update(transactionId, payload, userId);
        if (transactionUpdated.userId !== userId) {
            throw new ForbiddenException('Unauthorized Error');
        }
        return transactionUpdated;
    }

    public async deleteTransaction(transactionId: string, userId: string): Promise<TransactionDTO> {
        this.logger.log("Deleting a Transaction");
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
