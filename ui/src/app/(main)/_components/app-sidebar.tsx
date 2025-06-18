"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChartBarStacked, ChartSpline, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "../../../components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const items = [
    {
        title: "Transactions",
        url: "/transaction",
        icon: ChartSpline,
    },
    {
        title: "Categories",
        url: "/category",
        icon: ChartBarStacked,
    },
];

const AppSidebar = () => {
    const router = useRouter();

    const session = useSession();

    function handleLogout() {
        signOut();
        router.push("/sign-in");
    }
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-between">
                        <SidebarMenuButton className="flex justify-between" asChild>
                            <Button className="bg-neutral-500"
                                onClick={handleLogout}
                            >
                                <div className="flex items-baseline gap-2">
                                    <Image src="/logo.png" alt="logo" width={20} height={20} />
                                    <span>{session?.data?.user.name}</span>
                                </div>
                                <LogOut />
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.title === "Inbox" && (
                                        <SidebarMenuBadge>24</SidebarMenuBadge>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export { AppSidebar }
