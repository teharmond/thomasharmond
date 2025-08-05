"use client";

import React, { useState, useOptimistic, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, ChevronDown, ChevronRight, Archive, Circle, Loader2, CheckCircle2, XCircle, Copy } from "lucide-react";
import { TaskItem } from "./task-item";
import { TaskStatus } from "./status-select";
import { TaskPriority } from "./priority-select";

type Task = {
  _id: string;
  text: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  createdAt: number;
};

const statusGroups: { key: TaskStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { key: "backlog", label: "Backlog", icon: <Archive className="h-4 w-4" />, color: "text-gray-500" },
  { key: "todo", label: "Todo", icon: <Circle className="h-4 w-4" />, color: "text-blue-500" },
  { key: "in_progress", label: "In Progress", icon: <Loader2 className="h-4 w-4" />, color: "text-yellow-500" },
  { key: "completed", label: "Completed", icon: <CheckCircle2 className="h-4 w-4" />, color: "text-green-500" },
  { key: "duplicate", label: "Duplicate", icon: <Copy className="h-4 w-4" />, color: "text-purple-500" },
  { key: "canceled", label: "Canceled", icon: <XCircle className="h-4 w-4" />, color: "text-red-500" },
];

export default function TasksPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [newTask, setNewTask] = useState("");
  const [isPending, startTransition] = useTransition();
  const [collapsedSections, setCollapsedSections] = useState<Set<TaskStatus>>(new Set(["completed", "duplicate", "canceled"]));

  const tasksFromDb = useQuery(api.tasks.getTasks, isSignedIn ? undefined : "skip");
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasksFromDb || [],
    (state: Task[], update: { type: string; id?: string; task?: Partial<Task> }) => {
      switch (update.type) {
        case "update":
          return state.map(task => 
            task._id === update.id 
              ? { ...task, ...update.task } 
              : task
          );
        case "delete":
          return state.filter(task => task._id !== update.id);
        default:
          return state;
      }
    }
  );

  if (!isLoaded) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p>Please sign in to access your tasks.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      await createTask({ 
        text: newTask.trim(),
        status: "todo",
        priority: "medium"
      });
      setNewTask("");
    }
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    startTransition(async () => {
      // Optimistically update the UI
      setOptimisticTasks({ type: "update", id, task: { status } });
      
      try {
        await updateTask({ id: id as any, status });
      } catch (error) {
        // The UI will automatically revert when tasksFromDb updates
        console.error("Failed to update status:", error);
      }
    });
  };

  const handleUpdatePriority = (id: string, priority: TaskPriority) => {
    startTransition(async () => {
      // Optimistically update the UI
      setOptimisticTasks({ type: "update", id, task: { priority } });
      
      try {
        await updateTask({ id: id as any, priority });
      } catch (error) {
        // The UI will automatically revert when tasksFromDb updates
        console.error("Failed to update priority:", error);
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    startTransition(async () => {
      // Optimistically remove from UI
      setOptimisticTasks({ type: "delete", id });
      
      try {
        await deleteTask({ id: id as any });
      } catch (error) {
        // The UI will automatically revert when tasksFromDb updates
        console.error("Failed to delete task:", error);
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAddTask} className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newTask.trim()}>
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </form>

          <div className="space-y-4">
            {statusGroups.map((group) => {
              const tasksInGroup = optimisticTasks.filter(task => task.status === group.key);
              if (tasksInGroup.length === 0) return null;
              
              const isCollapsed = collapsedSections.has(group.key);
              
              return (
                <div key={group.key} className="space-y-2">
                  <Collapsible
                    open={!isCollapsed}
                    onOpenChange={(open) => {
                      const newCollapsed = new Set(collapsedSections);
                      if (open) {
                        newCollapsed.delete(group.key);
                      } else {
                        newCollapsed.add(group.key);
                      }
                      setCollapsedSections(newCollapsed);
                    }}
                  >
                    <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-accent rounded-md transition-colors">
                      {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <div className={`flex items-center gap-2 ${group.color}`}>
                        {group.icon}
                        <span className="font-medium">{group.label}</span>
                      </div>
                      <span className="text-muted-foreground text-sm ml-auto">
                        {tasksInGroup.length}
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {tasksInGroup.map((task) => (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onUpdateStatus={handleUpdateStatus}
                          onUpdatePriority={handleUpdatePriority}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })}
            {optimisticTasks.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No tasks yet. Add one above!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
