"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmarks, Projects, Tasks } from "./icons";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Tasks",
    url: "/tasks",
    icon: Tasks,
  },
  { title: "Projects", url: "/projects", icon: Projects },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmarks },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-medium text-sm  p-2 pb-0">Made by Thomas</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "rounded-lg py-1 border border-transparent text-muted-foreground hover:text-foreground",
                        isActive &&
                          " border-muted-foreground/20 !bg-background text-foreground shadow-xs",
                        !isActive && "hover:bg-transparent",
                        (item as any).isLoading && "cursor-default opacity-60"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
