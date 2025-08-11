"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import {
  X,
  Calendar,
  Clock,
  FileText,
  FolderOpen,
  Expand,
  Plus,
  CheckSquare,
  Square,
  Trash2,
} from "lucide-react";
import { StatusSelect, TaskStatus } from "./status-select";
import { PrioritySelect, TaskPriority } from "./priority-select";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectSelect } from "@/components/ui/project-select";
import { Id } from "@/convex/_generated/dataModel";

interface TaskDetailProps {
  task: {
    _id: string;
    text: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: number;
    description?: string;
    dueDate?: string;
    startDate?: string;
    projectId?: Id<"projects">;
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
  const [editedDueDate, setEditedDueDate] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const subtasks = useQuery(
    api.subtasks.getSubtasks,
    task ? { taskId: task._id as any } : "skip",
  );
  const createSubtask = useMutation(api.subtasks.createSubtask);
  const updateSubtaskStatus = useMutation(api.subtasks.updateSubtaskStatus);
  const deleteSubtask = useMutation(api.subtasks.deleteSubtask);

  useEffect(() => {
    if (task) {
      setEditedText(task.text);
      setEditedDueDate(task.dueDate || "");
      setEditedStartDate(task.startDate || "");
    }
  }, [task]);

  const debouncedUpdate = useCallback(
    debounce((id: string, updates: any) => {
      onUpdateTask(id, updates);
    }, 500),
    [onUpdateTask],
  );

  const handleTextChange = (value: string) => {
    setEditedText(value);
    if (task) {
      debouncedUpdate(task._id, { text: value });
    }
  };

  const handleDueDateChange = (value: string) => {
    setEditedDueDate(value);
    if (task) {
      debouncedUpdate(task._id, { dueDate: value });
    }
  };

  const handleStartDateChange = (value: string) => {
    setEditedStartDate(value);
    if (task) {
      debouncedUpdate(task._id, { startDate: value });
    }
  };

  const handleProjectChange = (projectId?: Id<"projects">) => {
    if (task) {
      onUpdateTask(task._id, { projectId });
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

  const handleToggleSubtask = async (
    subtaskId: string,
    currentStatus: string,
  ) => {
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
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-semibold">Task Details</h3>
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

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
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
          <Label htmlFor="project">
            <FolderOpen className="mr-1 inline h-4 w-4" />
            Project
          </Label>
          <ProjectSelect
            value={task.projectId}
            onValueChange={handleProjectChange}
            placeholder="Select a project"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-description">
            <FileText className="mr-1 inline h-4 w-4" />
            Description
          </Label>
          <TiptapEditor taskId={task._id as any} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="start-date">
              <Calendar className="mr-1 inline h-4 w-4" />
              Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              value={editedStartDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="due-date">
              <Calendar className="mr-1 inline h-4 w-4" />
              Due Date
            </Label>
            <Input
              id="due-date"
              type="date"
              value={editedDueDate}
              onChange={(e) => handleDueDateChange(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            <CheckSquare className="mr-1 inline h-4 w-4" />
            Subtasks
          </Label>
          <div className="space-y-2">
            {subtasks && subtasks.length > 0 && (
              <div className="space-y-1">
                {subtasks.map((subtask: any) => (
                  <div
                    key={subtask._id}
                    className="hover:bg-accent/50 group flex items-center gap-2 rounded p-2"
                  >
                    <button
                      onClick={() =>
                        handleToggleSubtask(subtask._id, subtask.status)
                      }
                      className="flex flex-1 items-center gap-2 text-left"
                    >
                      {subtask.status === "completed" ? (
                        <CheckSquare className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Square className="text-muted-foreground h-4 w-4" />
                      )}
                      <span
                        className={`text-sm ${
                          subtask.status === "completed"
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {subtask.text}
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
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

        <div className="border-t pt-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            Created {formatDate(task.createdAt)}
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-t p-4">
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
