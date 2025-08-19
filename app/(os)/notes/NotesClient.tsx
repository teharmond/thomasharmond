"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

export default function NotesClient() {
  const { user, isLoaded } = useUser();
  const notes = useQuery(api.notes.list, user ? {} : "skip");
  const createNote = useMutation(api.notes.create);
  const router = useRouter();

  if (!isLoaded) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">Please sign in to view your notes.</div>;
  }

  const handleCreateNote = async () => {
    const noteId = await createNote({
      title: "Untitled Note",
      content: "",
    });
    router.push(`/notes/${noteId}`);
  };

  if (!notes) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notes</h1>
          <Button disabled>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Button onClick={handleCreateNote}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
          <p className="text-gray-500 mb-4">Create your first note to get started.</p>
          <Button onClick={handleCreateNote}>
            <Plus className="h-4 w-4 mr-2" />
            Create Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card
              key={note._id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/notes/${note._id}`)}
            >
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">{note.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
                </div>
              </CardHeader>
              <CardContent>
                {note.content && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {note.content.replace(/<[^>]*>/g, "")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}