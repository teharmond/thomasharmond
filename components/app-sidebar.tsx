"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stacks,
  Bookmarks,
  Projects,
  Tasks,
  Settings,
  Hourglass,
  Document,
  Inbox,
  Home,
  Robot,
  Finance,
} from "./icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Home",
    url: "/inbox",
    icon: Home,
    section: "main",
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    section: "main",
  },
  {
    title: "AI Chat",
    url: "/ai-chat",
    icon: Robot,
    section: "main",
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: Tasks,
    section: "apps",
  },
  { title: "Projects", url: "/projects", icon: Projects, section: "apps" },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmarks, section: "apps" },
  { title: "Docs", url: "/docs", icon: Document, section: "apps" },
  {
    title: "Time Tracking",
    url: "/time-tracking",
    icon: Hourglass,
    section: "apps",
  },
  { title: "Finance", url: "/finance", icon: Finance, section: "apps" },
  { title: "Settings", url: "/settings", icon: Settings, section: "footer" },
];

export function AppSidebar() {
  const pathname = usePathname();

  const mainItems = items.filter((item) => item.section === "main");
  const appItems = items.filter((item) => item.section === "apps");
  const footerItems = items.filter((item) => item.section === "footer");

  const renderMenuItems = (itemsToRender: typeof items) => (
    <SidebarMenu className="gap-0">
      {itemsToRender.map((item) => {
        const isActive =
          pathname === item.url || pathname.startsWith(item.url + "/");

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className={cn(
                "text-muted-foreground hover:text-foreground rounded-lg border border-transparent py-1",
                isActive &&
                  "border-muted-foreground/20 !bg-background text-foreground shadow-xs",
                !isActive && "hover:bg-transparent",
                (item as any).isLoading && "cursor-default opacity-60",
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
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="flex items-center gap-1.5 p-2 pb-0 text-sm font-semibold">
          <span className="text-orange-500">
            <Stacks height={20} width={20} />
          </span>
          Made by Thomas
        </span>
      </SidebarHeader>
      <SidebarContent className="">
        {/* Main Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            {renderMenuItems(mainItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pinned Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Pinned</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>

        {/* Apps Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Apps</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(appItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            {renderMenuItems(footerItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
