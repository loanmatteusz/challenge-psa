import { api } from '@/lib/axios';
import { CreateTransaction, UpdateTransaction } from '@/interfaces/transaction.interface';

export async function createTransaction(data: CreateTransaction) {
    const response = await api.post('/transaction', {
        ...data,
    });
    return response;
}

export async function listTransactions() {
    const response = await api.get('/transaction');
    const { data: transactions } = response;
    return transactions;
}

export async function updateTransaction(data: UpdateTransaction) {
    const { id, categoryId, amount, type, description } = data;
    const response = await api.put(`/transaction/${id}`, {
        categoryId,
        amount,
        type,
        description,
    });
    return response;
}

export async function deleteTransaction(id: string) {
    const response = await api.delete(`/transaction/${id}`);
    return response;
}
