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
                <SidebarMenuItem key={item.title} className="font-bold">
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton className="py-6">
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>

                      <div className="ml-6 mt-1 space-y-1">
                        <SidebarMenuSub>
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.title} className="flex items-center gap-2">
                              <SidebarMenuSubButton className="py-4" href={sub.url}>
                                {sub.title}
                              </SidebarMenuSubButton>
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
