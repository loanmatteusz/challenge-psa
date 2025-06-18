import { api } from '@/lib/axios';
import { CreateCategory, UpdateCategory } from '@/interfaces/category.interface';

export async function createCategory(data: CreateCategory) {
    const response = await api.post('/category', {
        ...data,
    });
    return response;
}

export async function listCategories() {
    const response = await api.get('/category');
    const { data: categories } = response;
    return categories;
}

export async function updateCategory(data: UpdateCategory) {
    const { id, name } = data;
    const response = await api.put(`/category/${id}`, {
        name,
    });
    return response;
}

export async function deleteCategory(id: string) {
    const response = await api.delete(`/category/${id}`);
    return response;
}
