import { useQuery } from '@tanstack/react-query';
import { listTransactions } from '@/services/transaction';

export function useTransaction() {
    const {
        data: transactions,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['transactions'],
        queryFn: listTransactions,
    });

    return {
        transactions,
        isLoading,
        error,
        refetch,
    };
}
