"use client";

import { EditorContent, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useTiptapSync } from "@convex-dev/prosemirror-sync/tiptap";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface TiptapEditorProps {
  taskId: Id<"tasks">;
  placeholder?: string;
  className?: string;
}

export function TiptapEditor({ taskId, placeholder = "Add a description...", className }: TiptapEditorProps) {
  // Use the document ID as taskId for collaborative editing
  const documentId = taskId;
  const sync = useTiptapSync(api.prosemirrorSync, documentId);

  if (sync.isLoading) {
    return (
      <div className={`border rounded-md p-3 ${className || ""}`}>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (sync.initialContent === null) {
    return (
      <div className={`border rounded-md p-3 ${className || ""}`}>
        <button 
          onClick={() => sync.create({ type: "doc", content: [] })}
          className="text-blue-600 hover:text-blue-800"
        >
          Create document
        </button>
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
            class: "prose prose-sm focus:outline-none min-h-[100px] p-3 w-full max-w-none",
          },
        }}
      >
        <EditorContent editor={null} />
        {!sync.initialContent && (
          <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground">
            {placeholder}
          </div>
        )}
      </EditorProvider>
    </div>
  );
}