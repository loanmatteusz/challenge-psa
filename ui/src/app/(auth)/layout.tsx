'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// COMPONENTS
import { Spinner } from '@/components/ui/spinner';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (status === 'authenticated') {
        return redirect('/transaction');
    }

    return (
        <main className="flex items-center justify-center h-screen p-2">
            {children}
        </main>
    );
}
