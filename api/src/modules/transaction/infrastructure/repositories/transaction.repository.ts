import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

import { Transaction } from '../../domain/entities/transaction.entity';

import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';

import { GetTransactionsQueryDTO } from '../../presentation/dtos/get-transactions-query.dto';
import { CreateTransactionDTO } from '../../presentation/dtos/create-transaction.dto';
import { UpdateTransactionDTO } from '../../presentation/dtos/update-transaction.dto';

@Injectable()
export class TransactionRepository implements ITransactionRepository {

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async create(data: CreateTransactionDTO, userId: string): Promise<Transaction> {
        const transaction = await this.prismaService.transaction.create({
            data: {
                ...data,
                userId,
            },
            include: {
                category: true,
            }
        });
        return Transaction.fromPrisma(transaction);
    }

    public async getById(transactionId: string, userId: string): Promise<Transaction> {
        const transaction = await this.prismaService.transaction.findFirst({
            where: {
                id: transactionId,
                userId,
            },
            include: {
                category: true,
            }
        });
        return Transaction.fromPrisma(transaction);
    }

    public async getAllOrFilter(payload: GetTransactionsQueryDTO, userId: string): Promise<Transaction[]> {
        const transactions = await this.prismaService.transaction.findMany({
            where: payload.type ? { type: payload.type, userId } : { userId },
            include: {
                category: true,
            }
        });
        return Transaction.fromPrismaArray(transactions);
    }

    public async update(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<Transaction> {
        const transactionUpdated = await this.prismaService.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                ...payload
            },
            include: {
                category: true,
            }
        });
        return Transaction.fromPrisma(transactionUpdated);
    }

    public async delete(transactionId: string, userId: string): Promise<Transaction> {
        const transactionDeleted = await this.prismaService.transaction.delete({
            where: {
                id: transactionId,
            },
            include: {
                category: true,
            }
        });
        return Transaction.fromPrisma(transactionDeleted);
    }
}
