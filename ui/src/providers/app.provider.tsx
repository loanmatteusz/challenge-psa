'use client';

import { FC, ReactNode, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster as SonnerToaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

interface LayoutProps {
    children: ReactNode;
    pageProps: any;
}

const AppProvider: FC<LayoutProps> = ({ children, pageProps }) => {
    const [QC] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnMount: false,
                    refetchOnWindowFocus: false,
                    retry: 1,
                },
            },
        }),
    );

    return (
        <>
            <SonnerToaster richColors closeButton position="bottom-center" />
            <NextTopLoader color="#2a2a2a" />
            <QueryClientProvider client={QC} {...pageProps}>
                {children}
            </QueryClientProvider>
        </>
    );
};

export { AppProvider };
