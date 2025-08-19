"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NotePageProps {
  params: Promise<{
    noteId: string;
  }>;
}

export default function NotePage({ params }: NotePageProps) {
  const { noteId } = use(params);
  const noteIdTyped = noteId as Id<"notes">;
  const { user, isLoaded } = useUser();
  const note = useQuery(api.notes.get, user ? { id: noteIdTyped } : "skip");
  const updateNote = useMutation(api.notes.update);
  const deleteNote = useMutation(api.notes.remove);
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
    }
  }, [note]);

  if (!isLoaded) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">Please sign in to view this note.</div>;
  }

  const handleSaveTitle = async () => {
    if (!note || title === note.title) return;
    
    setIsSaving(true);
    try {
      await updateNote({
        id: noteIdTyped,
        title: title.trim() || "Untitled Note",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote({ id: noteIdTyped });
      router.push("/notes");
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (!note) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push("/notes")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Button>
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.push("/notes")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Notes
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveTitle}
            disabled={isSaving || title === note.title}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Title"}
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Note</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete &quot;{note.title}&quot;? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSaveTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSaveTitle();
            }
          }}
          className="text-2xl font-bold border-none shadow-none px-0 focus-visible:ring-0"
          placeholder="Untitled Note"
        />
        
        <TiptapEditor
          documentId={noteIdTyped}
          className="min-h-[500px]"
          placeholder="Start writing your note..."
        />
      </div>
    </div>
  );
}