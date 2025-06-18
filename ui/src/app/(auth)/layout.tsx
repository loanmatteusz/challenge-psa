'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (isAuthenticated) {
        redirect('/transaction');
    }

    return (
        <main className="flex items-center justify-center h-screen p-2 bg-stone-500">
            {children}
        </main>
    );
}
