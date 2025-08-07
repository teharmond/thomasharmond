"use client";

import { EditorContent, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useTiptapSync } from "@convex-dev/prosemirror-sync/tiptap";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";

interface TiptapEditorProps {
  taskId: Id<"tasks">;
  className?: string;
}

export function TiptapEditor({ taskId, className }: TiptapEditorProps) {
  // Use the document ID as taskId for collaborative editing
  const documentId = taskId;
  const sync = useTiptapSync(api.prosemirrorSync, documentId);

  // Auto-create empty document if it doesn't exist
  useEffect(() => {
    if (sync.initialContent === null && !sync.isLoading) {
      sync.create({ type: "doc", content: [] });
    }
  }, [sync]);

  if (sync.isLoading || sync.initialContent === null) {
    return (
      <div className={`border rounded-md p-3 ${className || ""}`}>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`border rounded-md relative ${className || ""}`}>
      <EditorProvider
        content={sync.initialContent}
        extensions={[StarterKit, sync.extension]}
        editorProps={{
          attributes: {
            class: "prose prose-sm focus:outline-none min-h-[100px] p-3 w-full max-w-none prose-headings:mt-0 prose-headings:mb-2 prose-p:my-1",
          },
        }}
      >
        <EditorContent editor={null} />
      </EditorProvider>
    </div>
  );
}