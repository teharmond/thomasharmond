"use client";

import React, { useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  FolderOpen,
  Trash2,
  Plus,
  CheckSquare,
  Square,
} from "lucide-react";
import { StatusSelect, TaskStatus } from "../status-select";
import { PrioritySelect, TaskPriority } from "../priority-select";
import { useRouter, useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { debounce } from "lodash";
import { useCallback } from "react";
import { ProjectSelect } from "@/components/ui/project-select";

export default function TaskPage() {
  const { isSignedIn, isLoaded } = useUser();
  const params = useParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const taskId = params.id as Id<"tasks">;

  const task = useQuery(
    api.tasks.getTaskById,
    isSignedIn && taskId ? { id: taskId } : "skip",
  );
  const subtasks = useQuery(
    api.subtasks.getSubtasks,
    isSignedIn && taskId ? { taskId } : "skip",
  );
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const createSubtask = useMutation(api.subtasks.createSubtask);
  const updateSubtaskStatus = useMutation(api.subtasks.updateSubtaskStatus);
  const deleteSubtask = useMutation(api.subtasks.deleteSubtask);

  const [editedText, setEditedText] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [newSubtaskText, setNewSubtaskText] = useState("");

  React.useEffect(() => {
    if (task) {
      setEditedText(task.text);
      setEditedDueDate(task.dueDate || "");
    }
  }, [task]);

  const debouncedUpdate = useCallback(
    debounce((updates: any) => {
      if (task) {
        startTransition(async () => {
          try {
            await updateTask({ id: task._id, ...updates });
          } catch (error) {
            console.error("Failed to update task:", error);
          }
        });
      }
    }, 500),
    [updateTask, task],
  );

  const handleTextChange = (value: string) => {
    setEditedText(value);
    debouncedUpdate({ text: value });
  };

  const handleDueDateChange = (value: string) => {
    setEditedDueDate(value);
    debouncedUpdate({ dueDate: value });
  };

  const handleUpdateStatus = (status: TaskStatus) => {
    if (task) {
      startTransition(async () => {
        try {
          await updateTask({ id: task._id, status });
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      });
    }
  };

  const handleUpdatePriority = (priority: TaskPriority) => {
    if (task) {
      startTransition(async () => {
        try {
          await updateTask({ id: task._id, priority });
        } catch (error) {
          console.error("Failed to update priority:", error);
        }
      });
    }
  };

  const handleUpdateProject = (projectId?: Id<"projects">) => {
    if (task) {
      startTransition(async () => {
        try {
          await updateTask({ id: task._id, projectId });
        } catch (error) {
          console.error("Failed to update project:", error);
        }
      });
    }
  };

  const handleDelete = () => {
    if (task && confirm("Are you sure you want to delete this task?")) {
      startTransition(async () => {
        try {
          await deleteTask({ id: task._id });
          router.push("/tasks");
        } catch (error) {
          console.error("Failed to delete task:", error);
        }
      });
    }
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

  const handleAddSubtask = async () => {
    if (!taskId || !newSubtaskText.trim()) return;

    try {
      await createSubtask({
        taskId,
        text: newSubtaskText.trim(),
      });
      setNewSubtaskText("");
    } catch (error) {
      console.error("Failed to create subtask:", error);
    }
  };

  const handleToggleSubtask = async (
    subtaskId: Id<"subtasks">,
    currentStatus: string,
  ) => {
    try {
      await updateSubtaskStatus({
        id: subtaskId,
        status: currentStatus === "completed" ? "todo" : "completed",
      });
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const handleDeleteSubtask = async (subtaskId: Id<"subtasks">) => {
    try {
      await deleteSubtask({ id: subtaskId });
    } catch (error) {
      console.error("Failed to delete subtask:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p>Please sign in to access your tasks.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (task === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading task...</div>
      </div>
    );
  }

  if (task === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="mb-2 text-xl font-semibold">Task not found</h2>
            <p className="text-muted-foreground mb-4">
              The task you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have access to it.
            </p>
            <Button onClick={() => router.push("/tasks")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/tasks")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
          <h1 className="text-3xl font-bold">Task Details</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="task-title">Title</Label>
                  <Input
                    id="task-title"
                    value={editedText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Task title"
                    className="text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-description">
                    <FileText className="mr-1 inline h-4 w-4" />
                    Description
                  </Label>
                  <TiptapEditor taskId={task._id} className="min-h-[200px]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status & Priority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <StatusSelect
                    value={task.status}
                    onValueChange={handleUpdateStatus}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <PrioritySelect
                    value={task.priority}
                    onValueChange={handleUpdatePriority}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    <FolderOpen className="mr-1 inline h-4 w-4" />
                    Project
                  </Label>
                  <ProjectSelect
                    value={task.projectId}
                    onValueChange={handleUpdateProject}
                    placeholder="Select a project"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
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

                <div className="border-t pt-4">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    Created {formatDate(task.createdAt)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5" />
                  Subtasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subtasks && subtasks.length > 0 && (
                  <div className="space-y-2">
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
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleDeleteSubtask(subtask._id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
