
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Building2 } from 'lucide-react';
import { AdminSidebarNav } from "@/components/layout/admin-sidebar-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
                <span className="text-sm font-medium">Admin User</span>
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
                    <AvatarFallback>AU</AvatarFallback>
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
  );
}
