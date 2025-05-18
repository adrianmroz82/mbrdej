import { Database, PlusCircle, Text } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn-ui/sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const items = [
  {
    title: "Zarzadzaj produktami",
    url: "/admin/products",
    icon: Database,
  },
  {
    title: "Dodaj nowy produkt",
    url: "/admin/add-product",
    icon: PlusCircle,
  },
  {
    title: "Zarzadzaj trescia",
    url: "/admin/content",
    icon: Text,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
