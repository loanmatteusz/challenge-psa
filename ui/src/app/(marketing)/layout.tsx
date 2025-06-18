"use client";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { status } = useSession();

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (status === 'authenticated') {
        return redirect('/transaction');
    }

    return <main className="w-full min-h-screen bg-[#CDCDCD] text-black">{children}</main>;
}
