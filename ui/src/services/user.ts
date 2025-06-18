import { api } from '@/lib/axios';

export async function getUserProfile() {
  const response = await api.get('/me');
  return response.data;
}
