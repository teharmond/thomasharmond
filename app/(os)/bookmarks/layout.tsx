"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Folder, FolderPlus, MoreHorizontal, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const folders = useQuery(api.bookmarks.getFolders);
  const createFolder = useMutation(api.bookmarks.createFolder);
  const deleteFolder = useMutation(api.bookmarks.deleteFolder);
  
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("");
  
  const currentFolderId = pathname.split("/bookmarks/")[1];
  const isAllBookmarks = pathname === "/bookmarks";
  
  const handleCreateFolder = async () => {
    if (!newFolderName) return;
    
    await createFolder({
      name: newFolderName,
      color: newFolderColor || undefined,
    });
    
    setNewFolderName("");
    setNewFolderColor("");
    setIsAddingFolder(false);
  };
  
  const handleDeleteFolder = async (id: Id<"bookmarkFolders">) => {
    await deleteFolder({ id });
    if (currentFolderId === id) {
      router.push("/bookmarks");
    }
  };

  // Wait for auth to load
  if (!isLoaded) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <Dialog open={isAddingFolder} onOpenChange={setIsAddingFolder}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Create a new folder to organize your bookmarks.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="folder-name">Folder Name</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                />
              </div>
              <div>
                <Label htmlFor="folder-color">Folder Color (optional)</Label>
                <Input
                  id="folder-color"
                  type="color"
                  value={newFolderColor}
                  onChange={(e) => setNewFolderColor(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingFolder(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>Create Folder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">Folders</div>
          <Link
            href="/bookmarks"
            className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent block ${
              isAllBookmarks ? 'bg-accent' : ''
            }`}
          >
            <Folder className="h-4 w-4" />
            <span className="text-sm">All Bookmarks</span>
          </Link>
          
          {folders?.map((folder) => (
            <div
              key={folder._id}
              className={`flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent group ${
                currentFolderId === folder._id ? 'bg-accent' : ''
              }`}
            >
              <Link
                href={`/bookmarks/${folder._id}`}
                className="flex items-center gap-2 flex-1"
              >
                <Folder
                  className="h-4 w-4"
                  style={{ color: folder.color || undefined }}
                />
                <span className="text-sm">{folder.name}</span>
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-8"
                    onClick={() => handleDeleteFolder(folder._id)}
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
        
        <div className="col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}