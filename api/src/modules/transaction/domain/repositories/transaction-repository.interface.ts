import { Transaction } from '../entities/transaction.entity';

// DTOs
import { GetTransactionsQueryDTO } from '../../presentation/dtos/get-transactions-query.dto';
import { CreateTransactionDTO } from '../../presentation/dtos/create-transaction.dto';
import { UpdateTransactionDTO } from '../../presentation/dtos/update-transaction.dto';

export interface ITransactionRepository {
    create(data: CreateTransactionDTO, userId: string): Promise<Transaction>;
    getById(transactionId: string, userId: string): Promise<Transaction | null>;
    getAllOrFilter(payload: GetTransactionsQueryDTO, userId: string): Promise<Transaction[]>;
    update(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<Transaction>;
    delete(transactionId: string, userId: string): Promise<Transaction>;
}
