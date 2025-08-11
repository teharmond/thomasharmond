"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { FolderSelect } from "@/components/ui/folder-select";
import { api } from "@/convex/_generated/api";

export default function HeaderBreadcrumbs() {
  const pathname = usePathname();
  
  // Extract folder ID from bookmark paths
  const isBookmarksPage = pathname.startsWith("/bookmarks");
  const folderId = isBookmarksPage && pathname !== "/bookmarks" 
    ? pathname.split("/bookmarks/")[1] 
    : undefined;

  // Use Convex React hooks for authenticated queries
  const folders = useQuery(api.bookmarks.getFolders);


  if (isBookmarksPage) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/bookmarks">Bookmarks</BreadcrumbLink>
          </BreadcrumbItem>
          {folderId && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <FolderSelect 
                    folders={folders} 
                    currentFolderId={folderId}
                  />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // For non-bookmarks pages
  const getBreadcrumbTitle = () => {
    if (pathname.startsWith("/tasks")) {
      return "Tasks";
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
