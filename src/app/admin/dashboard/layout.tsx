
'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Building2, Loader2 } from 'lucide-react';
import { AdminSidebarNav } from "@/components/layout/admin-sidebar-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/admin/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user } = useUser();
  return (
    <ProtectedRoute>
        <SidebarProvider>
        <Sidebar collapsible="icon">
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0" asChild>
                    <Link href="/"><Building2 /></Link>
                </Button>
                <span className="font-headline text-lg font-semibold overflow-hidden whitespace-nowrap">Wazai Properties Admin</span>
            </div>
            </SidebarHeader>
            <SidebarContent className="flex flex-col">
                <AdminSidebarNav />
            </SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-muted/30">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{user?.email}</span>
                    <Avatar>
                        <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/100/100`} />
                        <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex-1 p-4 sm:p-6">
                <div className="mx-auto max-w-screen-2xl">
                    {children}
                </div>
            </main>
        </SidebarInset>
        </SidebarProvider>
    </ProtectedRoute>
  );
}
