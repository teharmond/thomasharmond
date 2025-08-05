"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Calendar, Clock, FileText, Tag } from "lucide-react";
import { StatusSelect, TaskStatus } from "./status-select";
import { PrioritySelect, TaskPriority } from "./priority-select";
import { useState, useEffect } from "react";

interface TaskDetailProps {
  task: {
    _id: string;
    text: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: number;
    description?: string;
    dueDate?: string;
    tags?: string[];
  } | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onUpdatePriority: (id: string, priority: TaskPriority) => void;
  onUpdateTask?: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export function TaskDetail({
  task,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onUpdateTask,
  onDelete,
}: TaskDetailProps) {
  const [editedText, setEditedText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [editedTags, setEditedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (task) {
      setEditedText(task.text);
      setEditedDescription(task.description || "");
      setEditedDueDate(task.dueDate || "");
      setEditedTags(task.tags || []);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    if (onUpdateTask) {
      onUpdateTask(task._id, {
        text: editedText,
        description: editedDescription,
        dueDate: editedDueDate,
        tags: editedTags,
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter(tag => tag !== tagToRemove));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Task Details</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            id="task-title"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Task title"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label>Status</Label>
            <StatusSelect
              value={task.status}
              onValueChange={(status) => onUpdateStatus(task._id, status)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Priority</Label>
            <PrioritySelect
              value={task.priority}
              onValueChange={(priority) => onUpdatePriority(task._id, priority)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-description">
            <FileText className="inline h-4 w-4 mr-1" />
            Description
          </Label>
          <Textarea
            id="task-description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Add a description..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date">
            <Calendar className="inline h-4 w-4 mr-1" />
            Due Date
          </Label>
          <Input
            id="due-date"
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>
            <Tag className="inline h-4 w-4 mr-1" />
            Tags
          </Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button onClick={handleAddTag} size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {editedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-secondary rounded-md"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Created {formatDate(task.createdAt)}
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-4 border-t">
        <Button onClick={handleSave} className="flex-1">
          Save Changes
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onDelete(task._id);
            onClose();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}