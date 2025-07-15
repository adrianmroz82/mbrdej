"use client";

import { Database, PlusCircle, Text } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn-ui/sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const navigation = [
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
    icon: Text,
    subItems: [
      {
        title: "Strona Główna",
        url: "/admin/content/landing-page",
      },
      {
        title: "Obrazy",
        url: "/admin/content/images",
      },
      {
        title: "O mnie",
        url: "/admin/content/about-me",
      },
      {
        title: "Kontakt",
        url: "/admin/content/contact",
      },
    ],
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>

                      <div className="ml-6 mt-1 space-y-1">
                        <SidebarMenuSub>
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.title} className="flex items-center gap-2">
                              <SidebarMenuSubButton href={sub.url}>{sub.title}</SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </div>
                    </>
                  ) : (
                    <SidebarMenuButton asChild size="lg">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
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
