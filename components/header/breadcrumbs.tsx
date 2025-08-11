"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function HeaderBreadcrumbs() {
  const pathname = usePathname();
  
  const getBreadcrumbTitle = () => {
    if (pathname.startsWith("/tasks")) {
      return "Tasks";
    }
    if (pathname.startsWith("/bookmarks")) {
      return "Bookmarks";
    }
    if (pathname.startsWith("/projects")) {
      return "Projects";
    }
    return "Dashboard";
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
