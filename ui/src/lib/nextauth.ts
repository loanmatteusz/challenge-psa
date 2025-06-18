import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

// INTERFACES
import { IUser } from '@/interfaces/user.interface';

// AXIOS
import { api } from './axios';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 12,
    },
    jwt: {
        maxAge: 60 * 60 * 12,
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'your@email.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error('Invalid data');
                }
                try {
                    const { data: token } = await api.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const user = jwtDecode<IUser>(token);

                    return new Promise((resolve) =>
                        resolve({
                            ...user,
                            token,
                        } as IUser),
                    );
                } catch (error: any) {
                    console.error(error);
                    if (
                        error.message.includes('Network Error') ||
                        error.message.includes('connect ECONNREFUSED')
                    ) {
                        throw new Error('Unable to connect to the server');
                    }

                    const errorMsg =
                        error.response?.data.message || error.message || error;

                    throw new Error(errorMsg);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user as IUser;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user = token.user as IUser;
            }
            return session;
        },
    },
};
