import { AppSidebar } from "@/app/(main)/_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
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
