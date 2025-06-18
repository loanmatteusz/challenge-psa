import axios from 'axios';
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001/api',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.user) {
        config.headers.Authorization = `Bearer ${session?.user.token}`;
    }
    return config;
});
