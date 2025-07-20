import "@/styles/globals.css";

import { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar/admin-sidebar";
import { SidebarProvider } from "@/components/shadcn-ui/sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AdminSidebar />
        <main className="w-full">{children}</main>
      </ThemeProvider>
    </SidebarProvider>
  );
}
