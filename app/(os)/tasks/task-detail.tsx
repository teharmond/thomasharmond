"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Calendar, Clock, FileText, Tag, Expand, Plus, CheckSquare, Square, Trash2 } from "lucide-react";
import { StatusSelect, TaskStatus } from "./status-select";
import { PrioritySelect, TaskPriority } from "./priority-select";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface TaskDetailProps {
  task: {
    _id: string;
    text: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: number;
    description?: string;
    dueDate?: string;
  } | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onUpdatePriority: (id: string, priority: TaskPriority) => void;
  onUpdateTask: (id: string, updates: any) => void;
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
  const router = useRouter();
  const [editedText, setEditedText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [newSubtaskText, setNewSubtaskText] = useState("");
  
  const subtasks = useQuery(
    api.subtasks.getSubtasks,
    task ? { taskId: task._id as any } : "skip"
  );
  const createSubtask = useMutation(api.subtasks.createSubtask);
  const updateSubtaskStatus = useMutation(api.subtasks.updateSubtaskStatus);
  const deleteSubtask = useMutation(api.subtasks.deleteSubtask);

  useEffect(() => {
    if (task) {
      setEditedText(task.text);
      setEditedDescription(task.description || "");
      setEditedDueDate(task.dueDate || "");
    }
  }, [task]);

  const debouncedUpdate = useCallback(
    debounce((id: string, updates: any) => {
      onUpdateTask(id, updates);
    }, 500),
    [onUpdateTask]
  );

  const handleTextChange = (value: string) => {
    setEditedText(value);
    if (task) {
      debouncedUpdate(task._id, { text: value });
    }
  };

  const handleDescriptionChange = (value: string) => {
    setEditedDescription(value);
    if (task) {
      debouncedUpdate(task._id, { description: value });
    }
  };

  const handleDueDateChange = (value: string) => {
    setEditedDueDate(value);
    if (task) {
      debouncedUpdate(task._id, { dueDate: value });
    }
  };

  if (!task) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  const handleAddSubtask = async () => {
    if (!task || !newSubtaskText.trim()) return;
    
    try {
      await createSubtask({
        taskId: task._id as any,
        text: newSubtaskText.trim(),
      });
      setNewSubtaskText("");
    } catch (error) {
      console.error("Failed to create subtask:", error);
    }
  };
  
  const handleToggleSubtask = async (subtaskId: string, currentStatus: string) => {
    try {
      await updateSubtaskStatus({
        id: subtaskId as any,
        status: currentStatus === "completed" ? "todo" : "completed",
      });
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };
  
  const handleDeleteSubtask = async (subtaskId: string) => {
    try {
      await deleteSubtask({ id: subtaskId as any });
    } catch (error) {
      console.error("Failed to delete subtask:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Task Details</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/tasks/${task._id}`)}
            className="h-8 w-8"
            title="Expand to full page"
          >
            <Expand className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            id="task-title"
            value={editedText}
            onChange={(e) => handleTextChange(e.target.value)}
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
            onChange={(e) => handleDescriptionChange(e.target.value)}
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
            onChange={(e) => handleDueDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>
            <CheckSquare className="inline h-4 w-4 mr-1" />
            Subtasks
          </Label>
          <div className="space-y-2">
            {subtasks && subtasks.length > 0 && (
              <div className="space-y-1">
                {subtasks.map((subtask: any) => (
                  <div
                    key={subtask._id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-accent/50 group"
                  >
                    <button
                      onClick={() => handleToggleSubtask(subtask._id, subtask.status)}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      {subtask.status === "completed" ? (
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Square className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span
                        className={`text-sm ${
                          subtask.status === "completed"
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {subtask.text}
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteSubtask(subtask._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                placeholder="Add a subtask..."
                value={newSubtaskText}
                onChange={(e) => setNewSubtaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSubtask();
                  }
                }}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddSubtask}
                disabled={!newSubtaskText.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
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
        <Button
          variant="destructive"
          onClick={() => onDelete(task._id)}
          className="w-full"
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
}
