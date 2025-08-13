"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FolderPlus, MoreHorizontal, Trash2, Edit3 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Folder } from "@/components/icons";

export function FolderList() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const folders = useQuery(api.bookmarks.getFolders);
  const createFolder = useMutation(api.bookmarks.createFolder);
  const updateFolder = useMutation(api.bookmarks.updateFolder);
  const deleteFolder = useMutation(api.bookmarks.deleteFolder);

  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderColor, setNewFolderColor] = useState("");
  const [renamingFolder, setRenamingFolder] =
    useState<Id<"bookmarkFolders"> | null>(null);
  const [renameFolderName, setRenameFolderName] = useState("");
  const [renameFolderColor, setRenameFolderColor] = useState("");

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
  };

  const handleStartRename = (folder: any) => {
    setRenamingFolder(folder._id);
    setRenameFolderName(folder.name);
    setRenameFolderColor(folder.color || "");
  };

  const handleRenameFolder = async () => {
    if (!renamingFolder || !renameFolderName) return;

    await updateFolder({
      id: renamingFolder,
      name: renameFolderName,
      color: renameFolderColor || undefined,
    });

    setRenamingFolder(null);
    setRenameFolderName("");
    setRenameFolderColor("");
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
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <Dialog open={isAddingFolder} onOpenChange={setIsAddingFolder}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="mr-2 h-4 w-4" />
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
              <Button
                variant="outline"
                onClick={() => setIsAddingFolder(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>Create Folder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <Link
          href="/bookmarks/uncategorized"
          className="hover:bg-accent flex h-9 items-center gap-2 rounded-lg border px-3 transition-colors"
        >
          <Folder className="text-muted-foreground" />
          <div>
            <h3 className="text-sm">Uncategorized</h3>
          </div>
        </Link>

        {folders?.map((folder) => (
          <div
            key={folder._id}
            className="hover:bg-accent group flex h-9 items-center justify-between rounded-lg border px-3 shadow-xs transition-colors"
          >
            <Link
              href={`/bookmarks/${folder._id}`}
              className="flex flex-1 items-center gap-2"
            >
              <Folder style={{ color: folder.color || undefined }} />
              <div>
                <h3 className="text-sm">{folder.name}</h3>
              </div>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start"
                  onClick={() => handleStartRename(folder)}
                >
                  <Edit3 className="mr-2 h-3 w-3" />
                  Rename
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start"
                  onClick={() => handleDeleteFolder(folder._id)}
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ))}

        {folders?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No folders yet.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setIsAddingFolder(true)}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Create your first folder
            </Button>
          </div>
        )}
      </div>

      <Dialog
        open={!!renamingFolder}
        onOpenChange={() => setRenamingFolder(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
            <DialogDescription>
              Update the folder name and color.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rename-folder-name">Folder Name</Label>
              <Input
                id="rename-folder-name"
                value={renameFolderName}
                onChange={(e) => setRenameFolderName(e.target.value)}
                placeholder="Enter folder name"
              />
            </div>
            <div>
              <Label htmlFor="rename-folder-color">
                Folder Color (optional)
              </Label>
              <Input
                id="rename-folder-color"
                type="color"
                value={renameFolderColor}
                onChange={(e) => setRenameFolderColor(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenamingFolder(null)}>
              Cancel
            </Button>
            <Button onClick={handleRenameFolder} disabled={!renameFolderName}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
