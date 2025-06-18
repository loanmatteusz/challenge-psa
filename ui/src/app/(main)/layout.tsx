"use client";

import { AppSidebar } from "@/app/(main)/_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return redirect('/sign-in');
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full items-center justify-center p-4">
                <SidebarTrigger />
                {children}
            </div>
        </SidebarProvider>
    );
}
