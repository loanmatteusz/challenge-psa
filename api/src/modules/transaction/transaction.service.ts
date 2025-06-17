import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITransactionService } from './interfaces/transaction-service.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { TransactionDTO } from './dtos/transaction.dto';
import { GetTransactionsQuery } from './dtos/get-transactions-query.dto';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';

@Injectable()
export class TransactionService implements ITransactionService {
    private readonly logger: Logger = new Logger(TransactionService.name);

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async createTransaction(data: CreateTransactionDTO, userId: string): Promise<TransactionDTO> {
        this.logger.log("Create Transaction");
        const transaction = await this.prismaService.transaction.create({
            data: {
                ...data,
                userId,
            },
            include: {
                category: true,
            }
        });

        return TransactionDTO.fromPrisma(transaction);
    }

    public async getTransactionById(transactionId: string, userId: string): Promise<TransactionDTO> {
        const transaction = await this.prismaService.transaction.findFirst({
            where: {
                id: transactionId,
                userId,
            },
            include: {
                category: true,
            }
        });

        return TransactionDTO.fromPrisma(transaction);
    }

    public async getTransactions(payload: GetTransactionsQuery, userId: string): Promise<TransactionDTO[]> {
        const transactions = await this.prismaService.transaction.findMany({
            where: payload.categoryId || payload.type || payload.date ? { ...payload, userId } : { userId },
            include: {
                category: true,
            }
        });

        return TransactionDTO.fromPrismaArray(transactions);
    }

    public async updateTransaction(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<TransactionDTO> {
        const transactionUpdated = await this.prismaService.transaction.update({
            where: {
                id: transactionId,
                userId,
            },
            data: payload,
            include: {
                category: true,
            }
        });

        return TransactionDTO.fromPrisma(transactionUpdated);
    }

    public async deleteTransaction(transactionId: string, userId: string): Promise<TransactionDTO> {
        const transactionDeleted = await this.prismaService.transaction.delete({
            where: {
                id: transactionId,
                userId,
            },
            include: {
                category: true,
            }
        });

        return TransactionDTO.fromPrisma(transactionDeleted);
    }
}
