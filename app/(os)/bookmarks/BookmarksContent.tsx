"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Link as LinkIcon, MoreHorizontal, Trash2, Move, ExternalLink, Globe, Folder } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Id } from "@/convex/_generated/dataModel";

interface BookmarksContentProps {
  folderId?: string;
}

export function BookmarksContent({ folderId }: BookmarksContentProps) {
  const folders = useQuery(api.bookmarks.getFolders);
  
  const actualFolderId = folderId && folderId !== "all" ? folderId as Id<"bookmarkFolders"> : undefined;
  const showAll = !folderId; // Show all when at /bookmarks
  
  const bookmarks = useQuery(api.bookmarks.getBookmarks, { 
    folderId: actualFolderId,
    showAll: showAll
  });
  
  const createBookmark = useMutation(api.bookmarks.createBookmark);
  const updateBookmark = useMutation(api.bookmarks.updateBookmark);
  const deleteBookmark = useMutation(api.bookmarks.deleteBookmark);
  const moveBookmark = useMutation(api.bookmarks.moveBookmark);
  
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [movingBookmark, setMovingBookmark] = useState<Id<"bookmarks"> | null>(null);
  
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
  const [newBookmarkDescription, setNewBookmarkDescription] = useState("");

  const fetchOpenGraphData = async (url: string) => {
    try {
      const response = await fetch('/api/opengraph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching OpenGraph data:', error);
    }
    return null;
  };

  const handleCreateBookmark = async () => {
    if (!newBookmarkUrl) return;
    
    // Use URL as temporary title if no title provided
    const tempTitle = newBookmarkTitle || new URL(newBookmarkUrl).hostname;
    
    // Create bookmark immediately
    const bookmarkId = await createBookmark({
      url: newBookmarkUrl,
      title: tempTitle,
      description: newBookmarkDescription || undefined,
      favicon: undefined,
      image: undefined,
      folderId: actualFolderId,
    });
    
    setNewBookmarkUrl("");
    setNewBookmarkTitle("");
    setNewBookmarkDescription("");
    setIsAddingBookmark(false);
    
    // Fetch metadata in background and update
    fetchOpenGraphData(newBookmarkUrl).then(ogData => {
      if (ogData && bookmarkId) {
        updateBookmark({
          id: bookmarkId as Id<"bookmarks">,
          title: ogData.title || tempTitle,
          description: ogData.description || newBookmarkDescription || undefined,
          favicon: ogData.favicon || undefined,
          image: ogData.image || undefined,
        });
      }
    });
  };

  const handleDeleteBookmark = async (id: Id<"bookmarks">) => {
    await deleteBookmark({ id });
  };

  const handleMoveBookmark = async (bookmarkId: Id<"bookmarks">, folderId: Id<"bookmarkFolders"> | undefined) => {
    await moveBookmark({ id: bookmarkId, folderId });
    setMovingBookmark(null);
  };

  // Handle loading state
  if (bookmarks === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading bookmarks...</div>
      </div>
    );
  }

  const selectedFolder = actualFolderId ? folders?.find(f => f._id === actualFolderId) : null;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {selectedFolder && (
            <>
              <Folder
                className="h-5 w-5"
                style={{ color: selectedFolder.color || undefined }}
              />
              <h2 className="text-xl font-semibold">{selectedFolder.name}</h2>
            </>
          )}
          {!selectedFolder && (
            <h2 className="text-xl font-semibold">All Bookmarks</h2>
          )}
        </div>
        
        <Dialog open={isAddingBookmark} onOpenChange={setIsAddingBookmark}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
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
              <div>
                <Label htmlFor="bookmark-title">Title (optional)</Label>
                <Input
                  id="bookmark-title"
                  value={newBookmarkTitle}
                  onChange={(e) => setNewBookmarkTitle(e.target.value)}
                  placeholder="Will be fetched automatically"
                />
              </div>
              <div>
                <Label htmlFor="bookmark-description">Description (optional)</Label>
                <Textarea
                  id="bookmark-description"
                  value={newBookmarkDescription}
                  onChange={(e) => setNewBookmarkDescription(e.target.value)}
                  placeholder="Will be fetched automatically"
                />
              </div>
              {selectedFolder && (
                <div className="text-sm text-muted-foreground">
                  Will be added to: <span className="font-medium">{selectedFolder.name}</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingBookmark(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBookmark} disabled={!newBookmarkUrl}>
                Add Bookmark
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks?.map((bookmark) => (
          <Card key={bookmark._id} className="group relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {bookmark.favicon ? (
                    <img
                      src={bookmark.favicon}
                      alt=""
                      className="h-4 w-4"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  )}
                  <CardTitle className="text-sm font-medium line-clamp-1">
                    {bookmark.title}
                  </CardTitle>
                </div>
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
                      onClick={() => setMovingBookmark(bookmark._id)}
                    >
                      <Move className="h-3 w-3 mr-2" />
                      Move
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-8"
                      onClick={() => handleDeleteBookmark(bookmark._id)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              {bookmark.image && (
                <img
                  src={bookmark.image}
                  alt=""
                  className="w-full h-32 object-cover rounded-md mb-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              {bookmark.description && (
                <CardDescription className="text-xs line-clamp-2 mb-2">
                  {bookmark.description}
                </CardDescription>
              )}
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <LinkIcon className="h-3 w-3" />
                <span className="line-clamp-1">{bookmark.url}</span>
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookmarks?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setIsAddingBookmark(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add your first bookmark
          </Button>
        </div>
      )}

      <Dialog open={!!movingBookmark} onOpenChange={() => setMovingBookmark(null)}>
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
              <Folder className="h-4 w-4 mr-2" />
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
                  className="h-4 w-4 mr-2"
                  style={{ color: folder.color || undefined }}
                />
                {folder.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}