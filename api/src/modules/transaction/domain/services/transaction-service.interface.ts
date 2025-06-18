import { Transaction } from '../entities/transaction.entity';

// DTOs
import { UpdateTransactionDTO } from '../../presentation/dtos/update-transaction.dto';
import { CreateTransactionDTO } from '../../presentation/dtos/create-transaction.dto';
import { GetTransactionsQueryDTO } from '../../presentation/dtos/get-transactions-query.dto';

export interface ITransactionService {
	createTransaction(data: CreateTransactionDTO, userId: string): Promise<Transaction>;
	getTransactionById(transactionId: string, userId: string): Promise<Transaction>;
	getTransactions(payload: GetTransactionsQueryDTO, userId: string): Promise<Transaction[]>;
	updateTransaction(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<Transaction>;
	deleteTransaction(transactionId: string, userId: string): Promise<Transaction>;
}
