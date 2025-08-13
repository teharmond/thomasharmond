"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Folder } from "@/components/icons";

interface Folder {
  _id: string;
  name: string;
  color?: string;
}

interface FolderSelectProps {
  folders?: Folder[];
  currentFolderId?: string;
  showUncategorized?: boolean;
  className?: string;
}

export function FolderSelect({
  folders,
  currentFolderId,
  showUncategorized,
  className,
}: FolderSelectProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentFolder = currentFolderId
    ? folders?.find((f) => f._id === currentFolderId)
    : null;

  const getCurrentDisplayName = () => {
    if (showUncategorized) return "Uncategorized";
    if (currentFolder) return currentFolder.name;
    if (currentFolderId === null || !currentFolderId) return "All Folders";
    return "Loading...";
  };

  const handleFolderSelect = (folderId: string | null) => {
    setIsOpen(false);
    if (folderId === "uncategorized") {
      router.push("/bookmarks/uncategorized");
    } else if (folderId) {
      router.push(`/bookmarks/${folderId}`);
    } else {
      router.push("/bookmarks");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            className,
          )}
        >
          <div className="flex items-center gap-1">
            {(currentFolder || showUncategorized) && (
              <Folder
                className="h-4 w-4"
                style={{
                  color:
                    currentFolder?.color ||
                    (showUncategorized ? undefined : undefined),
                }}
              />
            )}
            <span className="font-medium">{getCurrentDisplayName()}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search folders..." />
          <CommandList>
            <CommandEmpty>No folders found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all-folders"
                onSelect={() => handleFolderSelect(null)}
              >
                <Folder className="mr-2 h-4 w-4" />
                All Folders
                {!currentFolderId && !showUncategorized && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </CommandItem>
              <CommandItem
                value="uncategorized"
                onSelect={() => handleFolderSelect("uncategorized")}
              >
                <Folder className="mr-2 h-4 w-4" />
                Uncategorized
                {showUncategorized && <Check className="ml-auto h-4 w-4" />}
              </CommandItem>
              {folders?.map((folder) => (
                <CommandItem
                  key={folder._id}
                  value={folder.name}
                  onSelect={() => handleFolderSelect(folder._id)}
                >
                  <Folder
                    className="mr-2 h-4 w-4"
                    style={{ color: folder.color || undefined }}
                  />
                  {folder.name}
                  {currentFolderId === folder._id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
