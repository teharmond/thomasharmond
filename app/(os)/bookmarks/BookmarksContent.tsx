"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
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
import {
  Plus,
  MoreHorizontal,
  Trash2,
  Move,
  Globe,
  Folder,
  ArrowLeft,
  Search,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

interface BookmarksContentProps {
  folderId?: string;
  showUncategorized?: boolean;
}

export function BookmarksContent({ folderId, showUncategorized }: BookmarksContentProps) {
  const { isLoaded } = useAuth();
  const folders = useQuery(api.bookmarks.getFolders);

  const actualFolderId =
    folderId && folderId !== "all"
      ? (folderId as Id<"bookmarkFolders">)
      : undefined;
  const showAll = !folderId && !showUncategorized;

  const bookmarks = useQuery(api.bookmarks.getBookmarks, {
    folderId: actualFolderId,
    showAll: showAll,
    showUncategorized: showUncategorized,
  });

  const createBookmark = useMutation(api.bookmarks.createBookmark);
  const updateBookmark = useMutation(api.bookmarks.updateBookmark);
  const deleteBookmark = useMutation(api.bookmarks.deleteBookmark);
  const moveBookmark = useMutation(api.bookmarks.moveBookmark);

  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [movingBookmark, setMovingBookmark] = useState<Id<"bookmarks"> | null>(
    null,
  );

  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkMetadata, setBookmarkMetadata] = useState<
    Record<string, { title: string; favicon?: string; loading: boolean }>
  >({});

  const fetchBookmarkMetadata = async (url: string, bookmarkId: string) => {
    if (bookmarkMetadata[bookmarkId] && !bookmarkMetadata[bookmarkId].loading) {
      return; // Already fetched
    }

    setBookmarkMetadata((prev) => ({
      ...prev,
      [bookmarkId]: {
        title: new URL(url).hostname,
        loading: true,
      },
    }));

    try {
      const response = await fetch("/api/opengraph", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarkMetadata((prev) => ({
          ...prev,
          [bookmarkId]: {
            title: data.title || new URL(url).hostname,
            favicon: data.favicon,
            loading: false,
          },
        }));
      } else {
        throw new Error("Failed to fetch metadata");
      }
    } catch (error) {
      console.error("Error fetching OpenGraph data:", error);
      setBookmarkMetadata((prev) => ({
        ...prev,
        [bookmarkId]: {
          title: new URL(url).hostname,
          loading: false,
        },
      }));
    }
  };

  useEffect(() => {
    // Fetch metadata for all bookmarks when they load
    bookmarks?.forEach((bookmark) => {
      fetchBookmarkMetadata(bookmark.url, bookmark._id);
    });
  }, [bookmarks]);

  const handleCreateBookmark = async () => {
    if (!newBookmarkUrl) return;

    const bookmarkId = await createBookmark({
      url: newBookmarkUrl,
      folderId: actualFolderId,
    });

    setNewBookmarkUrl("");
    setIsAddingBookmark(false);

    // Fetch metadata for the new bookmark
    if (bookmarkId) {
      fetchBookmarkMetadata(newBookmarkUrl, bookmarkId as Id<"bookmarks">);
    }
  };

  const handleDeleteBookmark = async (id: Id<"bookmarks">) => {
    await deleteBookmark({ id });
  };

  const handleMoveBookmark = async (
    bookmarkId: Id<"bookmarks">,
    folderId: Id<"bookmarkFolders"> | undefined,
  ) => {
    await moveBookmark({ id: bookmarkId, folderId });
    setMovingBookmark(null);
  };

  // Handle loading state - wait for both auth and data
  if (!isLoaded || bookmarks === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading bookmarks...</div>
      </div>
    );
  }

  const selectedFolder = actualFolderId
    ? folders?.find((f) => f._id === actualFolderId)
    : null;

  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarks?.filter((bookmark) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const title = bookmarkMetadata[bookmark._id]?.title?.toLowerCase() || "";
    const url = bookmark.url.toLowerCase();
    const hostname = new URL(bookmark.url).hostname.toLowerCase();
    
    return (
      title.includes(query) ||
      url.includes(query) ||
      hostname.includes(query)
    );
  }) || [];

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Link href="/bookmarks">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Folders
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          {selectedFolder && (
            <>
              <Folder
                className="h-6 w-6"
                style={{ color: selectedFolder.color || undefined }}
              />
              <h1 className="text-2xl font-bold">{selectedFolder.name}</h1>
            </>
          )}
          {showUncategorized && (
            <>
              <Folder className="h-6 w-6 text-muted-foreground" />
              <h1 className="text-2xl font-bold">Uncategorized</h1>
            </>
          )}
          {!selectedFolder && !showUncategorized && (
            <h1 className="text-2xl font-bold">All Bookmarks</h1>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Dialog open={isAddingBookmark} onOpenChange={setIsAddingBookmark}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Bookmark
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bookmark</DialogTitle>
              <DialogDescription>
                Add a new bookmark to your collection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bookmark-url">URL</Label>
                <Input
                  id="bookmark-url"
                  type="url"
                  value={newBookmarkUrl}
                  onChange={(e) => setNewBookmarkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              {selectedFolder && (
                <div className="text-muted-foreground text-sm">
                  Will be added to:{" "}
                  <span className="font-medium">{selectedFolder.name}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddingBookmark(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateBookmark} disabled={!newBookmarkUrl}>
                Add Bookmark
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {filteredBookmarks.map((bookmark) => (
          <div
            key={bookmark._id}
            className="group hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-3 transition-colors"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {bookmarkMetadata[bookmark._id]?.favicon ? (
                <img
                  src={bookmarkMetadata[bookmark._id].favicon}
                  alt=""
                  className="h-4 w-4 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <Globe className="text-muted-foreground h-4 w-4 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary block truncate text-sm font-medium transition-colors"
                >
                  {bookmarkMetadata[bookmark._id]?.loading
                    ? "Loading..."
                    : bookmarkMetadata[bookmark._id]?.title ||
                      new URL(bookmark.url).hostname}
                </a>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 flex-shrink-0 p-0 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start"
                  onClick={() => setMovingBookmark(bookmark._id)}
                >
                  <Move className="mr-2 h-3 w-3" />
                  Move
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start"
                  onClick={() => handleDeleteBookmark(bookmark._id)}
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>

      {filteredBookmarks.length === 0 && searchQuery && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No bookmarks found for &quot;{searchQuery}&quot;.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}

      {bookmarks?.length === 0 && !searchQuery && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setIsAddingBookmark(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add your first bookmark
          </Button>
        </div>
      )}

      <Dialog
        open={!!movingBookmark}
        onOpenChange={() => setMovingBookmark(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move Bookmark</DialogTitle>
            <DialogDescription>
              Select a folder to move this bookmark to.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleMoveBookmark(movingBookmark!, undefined)}
            >
              <Folder className="mr-2 h-4 w-4" />
              No Folder
            </Button>
            {folders?.map((folder) => (
              <Button
                key={folder._id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleMoveBookmark(movingBookmark!, folder._id)}
              >
                <Folder
                  className="mr-2 h-4 w-4"
                  style={{ color: folder.color || undefined }}
                />
                {folder.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
