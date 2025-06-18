import { api } from '@/lib/axios';

export async function registerUser(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
}

export async function loginUser(data: { email: string; password: string }) {
    const response = await api.post('/auth/login', data);

    const { data: token } = response;

    localStorage.setItem('token', token);

    return response.data;
}

export function logoutUser() {
    localStorage.removeItem('token');
}
