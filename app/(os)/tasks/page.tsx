"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

export default function TasksPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [newTask, setNewTask] = useState("");

  const tasks = useQuery(api.tasks.getTasks, isSignedIn ? undefined : "skip");
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

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
      await createTask({ text: newTask.trim() });
      setNewTask("");
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await updateTask({ id: id as any, completed: !completed });
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ id: id as any });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
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
              <Plus className="h-4 w-4" />
            </Button>
          </form>

          <div className="space-y-2">
            {tasks?.map((task) => (
              <div
                key={task._id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task._id, task.completed)}
                  className="h-4 w-4"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {tasks?.length === 0 && (
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
