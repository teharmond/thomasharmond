"use client";

import React from "react";
import { Inter } from "next/font/google";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import HeaderBreadcrumbs from "@/components/header/breadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <header className="sticky top-0 flex h-10 items-center justify-between border-b pr-6 pl-2">
            <span className="text-secondary-foreground flex items-center gap-3 text-sm font-medium">
              <SidebarTrigger />

              <HeaderBreadcrumbs />
            </span>
          </header>
          <main className={`flex-1 ${inter.className}`}>{children}</main>
          <CreateTaskDialog />
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
