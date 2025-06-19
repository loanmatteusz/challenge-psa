import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TransactionDTO } from './dtos/transaction.dto';

import { GetTransactionsQueryDTO } from './/dtos/get-transactions-query.dto';
import { CreateTransactionDTO } from './/dtos/create-transaction.dto';
import { UpdateTransactionDTO } from './/dtos/update-transaction.dto';

@Injectable()
export class TransactionRepository {

    @Inject(PrismaService)
    private readonly prismaService: PrismaService;

    public async create(data: CreateTransactionDTO, userId: string): Promise<TransactionDTO> {
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

    public async getById(transactionId: string, userId: string): Promise<TransactionDTO> {
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

    public async getAllOrFilter(payload: GetTransactionsQueryDTO, userId: string): Promise<TransactionDTO[]> {
        const transactions = await this.prismaService.transaction.findMany({
            where: payload.type ? { type: payload.type, userId } : { userId },
            include: {
                category: true,
            }
        });
        return TransactionDTO.fromPrismaArray(transactions);
    }

    public async update(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<TransactionDTO> {
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
        return TransactionDTO.fromPrisma(transactionUpdated);
    }

    public async delete(transactionId: string, userId: string): Promise<TransactionDTO> {
        const transactionDeleted = await this.prismaService.transaction.delete({
            where: {
                id: transactionId,
            },
            include: {
                category: true,
            }
        });
        return TransactionDTO.fromPrisma(transactionDeleted);
    }
}
