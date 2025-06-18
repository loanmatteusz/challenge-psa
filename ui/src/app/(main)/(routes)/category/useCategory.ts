import { useQuery } from '@tanstack/react-query';
import { listCategories } from '@/services/category';

export function useCategory() {
    const {
        data: categories,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: listCategories,
    });

    return {
        categories,
        isLoading,
        error,
        refetch,
    };
}
