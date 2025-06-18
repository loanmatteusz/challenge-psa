// DTOs
import { UpdateTransactionDTO } from '../dtos/update-transaction.dto';
import { TransactionDTO } from '../dtos/transaction.dto';
import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { GetTransactionsQueryDTO } from '../dtos/get-transactions-query.dto';

export interface ITransactionService {
	createTransaction(data: CreateTransactionDTO, userId: string): Promise<TransactionDTO>;
	getTransactionById(transactionId: string, userId: string): Promise<TransactionDTO>;
	getTransactions(payload: GetTransactionsQueryDTO, userId: string): Promise<TransactionDTO[]>;
	updateTransaction(transactionId: string, payload: UpdateTransactionDTO, userId: string): Promise<TransactionDTO>;
	deleteTransaction(transactionId: string, userId: string): Promise<TransactionDTO>;
}
