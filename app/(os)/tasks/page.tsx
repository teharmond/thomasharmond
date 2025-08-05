"use client";

import React, {
  useState,
  useOptimistic,
  useTransition,
  useEffect,
  useMemo,
} from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Archive,
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
} from "lucide-react";
import { TaskStatus, StatusSelect } from "./status-select";
import { TaskPriority, PrioritySelect } from "./priority-select";
import { TaskDetail } from "./task-detail";
import { motion, AnimatePresence } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ExpandedState,
} from "@tanstack/react-table";

type Task = {
  _id: string;
  text: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string;
  dueDate?: string;
  userId: string;
  createdAt: number;
};

const statusGroups: Record<
  TaskStatus,
  {
    label: string;
    icon: React.ReactNode;
    color: string;
  }
> = {
  in_progress: {
    label: "In Progress",
    icon: <Loader2 className="h-4 w-4" />,
    color: "text-yellow-500",
  },
  todo: {
    label: "Todo",
    icon: <Circle className="h-4 w-4" />,
    color: "text-blue-500",
  },
  backlog: {
    label: "Backlog",
    icon: <Archive className="h-4 w-4" />,
    color: "text-gray-500",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-green-500",
  },
  canceled: {
    label: "Canceled",
    icon: <XCircle className="h-4 w-4" />,
    color: "text-red-500",
  },
  duplicate: {
    label: "Duplicate",
    icon: <Copy className="h-4 w-4" />,
    color: "text-purple-500",
  },
};

// Define the desired order for status groups
const statusOrder: TaskStatus[] = ['in_progress', 'todo', 'backlog', 'completed', 'canceled', 'duplicate'];

export default function TasksPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [newTask, setNewTask] = useState("");
  const [, startTransition] = useTransition();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [deletingTasks, setDeletingTasks] = useState<Set<string>>(new Set());
  const [groupExpanded, setGroupExpanded] = useState<ExpandedState>(() => {
    if (typeof window === "undefined") {
      return {
        in_progress: true,
        todo: true,
        backlog: true,
        completed: false,
        canceled: false,
        duplicate: false,
      };
    }

    const stored = localStorage.getItem("task-section-expanded");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fall back to defaults if parsing fails
      }
    }

    return {
      in_progress: true,
      todo: true,
      backlog: true,
      completed: false,
      canceled: false,
      duplicate: false,
    };
  });

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "task-section-expanded",
      JSON.stringify(groupExpanded)
    );
  }, [groupExpanded]);

  const tasksFromDb = useQuery(
    api.tasks.getTasks,
    isSignedIn ? undefined : "skip"
  );
  const createTask = useMutation(api.tasks.createTask);
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasksFromDb || [],
    (
      state: Task[],
      update: { type: string; id?: string; task?: Partial<Task> }
    ) => {
      switch (update.type) {
        case "update":
          return state.map((task) =>
            task._id === update.id ? { ...task, ...update.task } : task
          );
        case "delete":
          return state.filter((task) => task._id !== update.id);
        default:
          return state;
      }
    }
  );

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      await createTask({
        text: newTask.trim(),
        status: "todo",
        priority: "medium",
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
    // Prevent multiple delete calls for the same task
    if (deletingTasks.has(id)) {
      return;
    }

    setDeletingTasks((prev) => new Set([...prev, id]));

    startTransition(async () => {
      try {
        // Close the detail panel immediately to prevent race conditions
        if (selectedTask?._id === id) {
          setSelectedTask(null);
        }

        // Optimistically remove from UI
        setOptimisticTasks({ type: "delete", id });

        // Perform the actual delete
        await deleteTask({ id: id as any });
      } catch (error) {
        // The UI will automatically revert when tasksFromDb updates
        console.error("Failed to delete task:", error);
      } finally {
        // Remove from deleting set
        setDeletingTasks((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    });
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    startTransition(async () => {
      // Optimistically update the UI
      setOptimisticTasks({ type: "update", id, task: updates });

      try {
        await updateTask({ id: id as any, ...updates });
      } catch (error) {
        // The UI will automatically revert when tasksFromDb updates
        console.error("Failed to update task:", error);
      }
    });
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  const columns = useMemo<ColumnDef<Task, any>[]>(
    () => [
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: () => null,
        enableGrouping: true,
        sortingFn: (rowA, rowB) => {
          const statusA = rowA.original.status;
          const statusB = rowB.original.status;
          const indexA = statusOrder.indexOf(statusA);
          const indexB = statusOrder.indexOf(statusB);
          return indexA - indexB;
        },
      } as ColumnDef<Task, any>,
      {
        id: "title",
        accessorKey: "text",
        header: "Title",
        cell: ({ row }) => (
          <div
            className="cursor-pointer hover:bg-accent/50 p-2 rounded transition-colors"
            onClick={() => handleTaskClick(row.original)}
          >
            <div className="font-medium text-sm">{row.original.text}</div>
            {row.original.description && (
              <div className="text-sm text-muted-foreground mt-1">
                {row.original.description}
              </div>
            )}
          </div>
        ),
      } as ColumnDef<Task, any>,
      {
        id: "priority",
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <PrioritySelect
              value={row.original.priority}
              onValueChange={(priority: TaskPriority) =>
                handleUpdatePriority(row.original._id, priority)
              }
            />
          </div>
        ),
      } as ColumnDef<Task, any>,
      {
        id: "dueDate",
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (
          <div className="text-center">
            {row.original.dueDate ? (
              new Date(row.original.dueDate).toLocaleDateString()
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
        ),
      } as ColumnDef<Task, any>,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <StatusSelect
              value={row.original.status}
              onValueChange={(status: TaskStatus) =>
                handleUpdateStatus(row.original._id, status)
              }
            />
          </div>
        ),
      } as ColumnDef<Task, any>,
    ],
    [handleUpdateStatus, handleUpdatePriority, handleTaskClick]
  );

  const table = useReactTable({
    data: optimisticTasks || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      grouping: ["status"],
      expanded: groupExpanded,
      sorting: [{ id: "status", desc: false }],
    },
    state: {
      expanded: groupExpanded,
      sorting: [{ id: "status", desc: false }],
    },
    onExpandedChange: setGroupExpanded,
    groupedColumnMode: false,
    autoResetExpanded: false,
    autoResetPageIndex: false,
  });

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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main task list area - shifts over on desktop */}
      <motion.div
        animate={{
          marginRight: selectedTask && isDesktop ? "512px" : "0px",
        }}
        transition={{ type: "spring", damping: 50, stiffness: 1000 }}
        className="flex-1 h-full"
        onClick={() => selectedTask && handleCloseDetail()}
      >
        <div className="w-full h-full p-6">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
              <form onSubmit={handleAddTask} className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!newTask.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </form>
            </div>

            <div
              className="flex-1 overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {optimisticTasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No tasks yet. Add one above!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {table.getRowModel().rows.map((row) => {
                    if (row.getIsGrouped()) {
                      const groupValue = row.getGroupingValue(
                        "status"
                      ) as TaskStatus;
                      const group = statusGroups[groupValue];
                      const isExpanded = row.getIsExpanded();
                      const tasksCount = row.subRows.length;

                      if (tasksCount === 0) return null;

                      return (
                        <div key={row.id} className="bg-card rounded-lg border">
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={(open) => {
                              row.toggleExpanded(open);
                            }}
                          >
                            <CollapsibleTrigger className="flex items-center gap-3 w-full p-4 hover:bg-accent transition-colors">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronRight className="h-5 w-5" />
                              )}
                              <div
                                className={`flex items-center gap-3 ${group.color}`}
                              >
                                {group.icon}
                                <span className="font-semibold text-lg">
                                  {group.label}
                                </span>
                              </div>
                              <span className="text-muted-foreground text-sm ml-auto bg-muted px-2 py-1 rounded">
                                {tasksCount}{" "}
                                {tasksCount === 1 ? "task" : "tasks"}
                              </span>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="px-4 pb-4">
                                <div className="bg-background rounded border">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-b bg-muted/50">
                                        <th className="text-left p-3 font-medium text-sm">
                                          Title
                                        </th>
                                        <th className="text-center p-3 font-medium text-sm w-32">
                                          Priority
                                        </th>
                                        <th className="text-center p-3 font-medium text-sm w-32">
                                          Due Date
                                        </th>
                                        <th className="text-center p-3 font-medium text-sm w-40">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {row.subRows.map((subRow, index) => (
                                        <tr
                                          key={subRow.id}
                                          className={`border-b last:border-b-0 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "bg-muted/10" : ""}`}
                                        >
                                          <td className="p-3">
                                            {flexRender(
                                              columns[1].cell,
                                              subRow
                                                .getVisibleCells()[1]
                                                .getContext()
                                            )}
                                          </td>
                                          <td className="p-3 text-center">
                                            {flexRender(
                                              columns[2].cell,
                                              subRow
                                                .getVisibleCells()[2]
                                                .getContext()
                                            )}
                                          </td>
                                          <td className="p-3 text-center">
                                            {flexRender(
                                              columns[3].cell,
                                              subRow
                                                .getVisibleCells()[3]
                                                .getContext()
                                            )}
                                          </td>
                                          <td className="p-3 text-center">
                                            {flexRender(
                                              columns[4].cell,
                                              subRow
                                                .getVisibleCells()[4]
                                                .getContext()
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop side panel */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 50, stiffness: 1000 }}
            className="hidden md:block fixed top-0 right-0 w-[32rem] h-full border-l bg-background shadow-xl z-50"
          >
            <TaskDetail
              task={selectedTask}
              onClose={handleCloseDetail}
              onUpdateStatus={handleUpdateStatus}
              onUpdatePriority={handleUpdatePriority}
              onUpdateTask={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {selectedTask && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={handleCloseDetail}
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 500 }}
              className="md:hidden fixed inset-0 bg-background shadow-xl z-50 overflow-y-auto"
            >
              <TaskDetail
                task={selectedTask}
                onClose={handleCloseDetail}
                onUpdateStatus={handleUpdateStatus}
                onUpdatePriority={handleUpdatePriority}
                onUpdateTask={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
