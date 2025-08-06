"use client";

import React from "react";
import { Inter } from "next/font/google";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <div className={inter.className}>
        {children}
        <CreateTaskDialog />
      </div>
    </NuqsAdapter>
  );
}
