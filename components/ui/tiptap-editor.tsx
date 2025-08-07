"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useCallback } from "react";

interface TiptapEditorProps {
  taskId: Id<"tasks">;
  placeholder?: string;
  className?: string;
}

export function TiptapEditor({ taskId, placeholder = "Add a description...", className }: TiptapEditorProps) {
  const task = useQuery(api.tasks.getTaskById, { id: taskId });
  const updateTask = useMutation(api.tasks.updateTask);
  const lastSavedContent = useRef<string>("");
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const saveContent = useCallback((content: string) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      if (content !== lastSavedContent.current) {
        updateTask({ id: taskId, description: content });
        lastSavedContent.current = content;
      }
    }, 1000);
  }, [updateTask, taskId]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: task?.description || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[100px] p-3 w-full max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      saveContent(content);
    },
  });

  // Update editor content when task data changes (but only if editor isn't focused)
  useEffect(() => {
    if (editor && task?.description !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== task.description && !editor.isFocused) {
        editor.commands.setContent(task.description || "");
        lastSavedContent.current = task.description || "";
      }
    }
  }, [editor, task?.description]);

  // Set initial content reference when task loads
  useEffect(() => {
    if (task?.description !== undefined) {
      lastSavedContent.current = task.description;
    }
  }, [task?.description]);

  if (!task) {
    return (
      <div className={`border rounded-md p-3 ${className || ""}`}>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`border rounded-md relative ${className || ""}`}>
      <EditorContent editor={editor} />
      {!editor?.getText().trim() && !editor?.isFocused && (
        <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground">
          {placeholder}
        </div>
      )}
    </div>
  );
}