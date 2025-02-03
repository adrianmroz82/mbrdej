import "@/styles/globals.css";

import { ReactNode } from "react";

import { SidebarProvider } from "@/components/shadcn-ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

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
