"use client";

import React from "react";
import { Inter } from "next/font/google";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <main className={`flex-1 ${inter.className}`}>{children}</main>
          <CreateTaskDialog />
        </SidebarInset>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
