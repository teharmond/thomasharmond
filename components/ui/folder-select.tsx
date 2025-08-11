"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Folder } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Folder {
  _id: string;
  name: string;
  color?: string;
}

interface FolderSelectProps {
  folders?: Folder[];
  currentFolderId?: string;
  className?: string;
}

export function FolderSelect({ folders, currentFolderId, className }: FolderSelectProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentFolder = currentFolderId 
    ? folders?.find(f => f._id === currentFolderId)
    : null;

  const handleFolderSelect = (folderId: string | null) => {
    setIsOpen(false);
    if (folderId) {
      router.push(`/bookmarks/${folderId}`);
    } else {
      router.push('/bookmarks');
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn("h-auto p-0 hover:bg-transparent", className)}
        >
          <div className="flex items-center gap-2">
            {currentFolder && (
              <Folder 
                className="h-4 w-4" 
                style={{ color: currentFolder.color || undefined }}
              />
            )}
            <span className="font-medium">
              {currentFolder?.name || "Loading..."}
            </span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={() => handleFolderSelect(null)}>
          <Folder className="mr-2 h-4 w-4" />
          All Bookmarks
        </DropdownMenuItem>
        {folders?.map((folder) => (
          <DropdownMenuItem 
            key={folder._id} 
            onClick={() => handleFolderSelect(folder._id)}
          >
            <Folder 
              className="mr-2 h-4 w-4" 
              style={{ color: folder.color || undefined }}
            />
            {folder.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}