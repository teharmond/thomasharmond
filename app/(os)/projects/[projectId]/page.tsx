"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  CheckCircle2,
  Circle,
  Copy,
  Loader2,
  Plus,
  PlusIcon,
  Trash2,
  Triangle,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  Suspense,
  use,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { PrioritySelect, TaskPriority } from "../../tasks/priority-select";
import { StatusSelect, TaskStatus } from "../../tasks/status-select";
import { TaskDetail } from "../../tasks/task-detail";

type Task = {
  _id: string;
  text: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string;
  dueDate?: string;
  userId: string;
  createdAt: number;
  projectId?: Id<"projects">;
  subtaskCount?: number;
  completedSubtaskCount?: number;
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

const statusOrder: TaskStatus[] = [
  "in_progress",
  "todo",
  "backlog",
  "completed",
  "canceled",
  "duplicate",
];

function ProjectTasksContent({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const { isSignedIn, isLoaded } = useUser();
  const [, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

    const stored = localStorage.getItem(
      `project-task-section-expanded-${resolvedParams.projectId}`,
    );
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
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      `project-task-section-expanded-${resolvedParams.projectId}`,
      JSON.stringify(groupExpanded),
    );
  }, [groupExpanded, resolvedParams.projectId]);

  const project = useQuery(
    api.projects.getProject,
    isSignedIn && resolvedParams.projectId
      ? { id: resolvedParams.projectId as Id<"projects"> }
      : "skip",
  );

  const tasksFromDb = useQuery(
    api.tasks.getTasksByProject,
    isSignedIn && resolvedParams.projectId
      ? { projectId: resolvedParams.projectId as Id<"projects"> }
      : "skip",
  );

  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const bulkDeleteTasks = useMutation(api.tasks.bulkDeleteTasks);
  const bulkUpdateStatus = useMutation(api.tasks.bulkUpdateStatus);

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasksFromDb || [],
    (
      state: Task[],
      update: { type: string; id?: string; task?: Partial<Task> },
    ) => {
      switch (update.type) {
        case "update":
          return state.map((task) =>
            task._id === update.id ? { ...task, ...update.task } : task,
          );
        case "delete":
          return state.filter((task) => task._id !== update.id);
        default:
          return state;
      }
    },
  );

  const setDialogOpen = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("newTask", value);
    } else {
      params.delete("newTask");
    }
    router.push(`?${params.toString()}`);
  };

  const setPresetStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`?${params.toString()}`);
  };

  const openDialogWithStatus = (status?: TaskStatus) => {
    if (status) {
      setPresetStatus(status);
    }
    setDialogOpen("open");
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    startTransition(async () => {
      setOptimisticTasks({ type: "update", id, task: { status } });

      try {
        await updateTask({ id: id as any, status });
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    });
  };

  const handleUpdatePriority = (id: string, priority: TaskPriority) => {
    startTransition(async () => {
      setOptimisticTasks({ type: "update", id, task: { priority } });

      try {
        await updateTask({ id: id as any, priority });
      } catch (error) {
        console.error("Failed to update priority:", error);
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    startTransition(async () => {
      try {
        if (selectedTask?._id === id) {
          setSelectedTask(null);
        }

        setOptimisticTasks({ type: "delete", id });
        await deleteTask({ id: id as any });
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    });
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    startTransition(async () => {
      setOptimisticTasks({ type: "update", id, task: updates });

      try {
        await updateTask({ id: id as any, ...updates });
      } catch (error) {
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

  const handleBulkDelete = async () => {
    if (selectedRows.size === 0) return;

    const idsToDelete = Array.from(selectedRows);
    setSelectedRows(new Set());
    setShowDeleteDialog(false);

    startTransition(async () => {
      try {
        idsToDelete.forEach((id) => {
          setOptimisticTasks({ type: "delete", id });
        });

        await bulkDeleteTasks({ ids: idsToDelete as any });
      } catch (error) {
        console.error("Failed to bulk delete tasks:", error);
      }
    });
  };

  const handleBulkUpdateStatus = async (status: TaskStatus) => {
    if (selectedRows.size === 0) return;

    const idsToUpdate = Array.from(selectedRows);
    setSelectedRows(new Set());

    startTransition(async () => {
      try {
        idsToUpdate.forEach((id) => {
          setOptimisticTasks({ type: "update", id, task: { status } });
        });

        await bulkUpdateStatus({ ids: idsToUpdate as any, status });
      } catch (error) {
        console.error("Failed to bulk update status:", error);
      }
    });
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
    ],
    [],
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
            <p>Please sign in to access your projects.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p>Project not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <motion.div
        animate={{
          marginRight: selectedTask && isDesktop ? "512px" : "0px",
        }}
        transition={{ type: "spring", damping: 50, stiffness: 1000 }}
        className="h-full flex-1"
        onClick={() => selectedTask && handleCloseDetail()}
      >
        <div className="h-full w-full">
          <header className="sticky top-0 flex h-10 items-center justify-between border-b pr-6 pl-2">
            <span className="text-secondary-foreground flex items-center gap-3 text-sm font-medium">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Link
                      href="/projects"
                      className="hover:text-foreground transition-colors"
                    >
                      Projects
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{project.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </span>
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => openDialogWithStatus()}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Task
            </Button>
          </header>

          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto">
              {optimisticTasks.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No tasks in this project yet. Add one above!
                  </p>
                </div>
              ) : (
                <div className="space-y-0" onClick={(e) => e.stopPropagation()}>
                  {table.getRowModel().rows.map((row, index, rows) => {
                    if (row.getIsGrouped()) {
                      const groupValue = row.getGroupingValue(
                        "status",
                      ) as TaskStatus;
                      const group = statusGroups[groupValue];
                      const isExpanded = row.getIsExpanded();
                      const tasksCount = row.subRows.length;

                      if (tasksCount === 0) return null;

                      const lastVisibleIndex = rows.findLastIndex(
                        (r) => r.getIsGrouped() && r.subRows.length > 0,
                      );
                      const isLastVisible = index === lastVisibleIndex;

                      return (
                        <div
                          key={row.id}
                          className={`bg-card ${!isLastVisible && isExpanded ? "border-b" : ""}`}
                        >
                          <Collapsible
                            open={isExpanded}
                            onOpenChange={(open) => {
                              row.toggleExpanded(open);
                            }}
                          >
                            <div className="bg-muted flex h-9 w-full items-center justify-between border-b pr-6">
                              <div className="flex items-center gap-1.5">
                                <CollapsibleTrigger className="group/collapsible-trigger hover:bg-accent bg-muted flex w-7 items-center justify-between gap-2 py-1 pr-0 pl-3 text-sm transition-colors">
                                  {isExpanded ? (
                                    <Triangle className="text-muted-foreground fill-muted-foreground group-hover/collapsible-trigger:fill-foreground group-hover/collapsible-trigger:text-foreground h-2 w-2 rotate-180" />
                                  ) : (
                                    <Triangle className="fill-foreground text-foreground mr-1 h-2 w-2 rotate-90" />
                                  )}
                                </CollapsibleTrigger>
                                <div className="flex items-center gap-2">
                                  <span className={group.color}>
                                    {group.icon}
                                  </span>
                                  <span className="text-secondary-foreground text-sm">
                                    {group.label}
                                  </span>
                                  <span className="text-muted-foreground bg-muted ml-auto rounded px-2 py-1 text-sm">
                                    {tasksCount}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-foreground/10 text-muted-foreground hover:text-foreground"
                                onClick={() => openDialogWithStatus(groupValue)}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </Button>
                            </div>
                            <CollapsibleContent>
                              <div>
                                <div className="bg-background">
                                  <div className="w-full">
                                    {row.subRows.map((subRow, index) => {
                                      const isSelected = selectedRows.has(
                                        subRow.original._id,
                                      );
                                      return (
                                        <div
                                          key={subRow.id}
                                          className={`hover:bg-muted/30 border-b py-1 pr-6 pl-1 transition-colors last:border-b-0 ${
                                            isSelected
                                              ? "bg-secondary/30 hover:bg-secondary/30"
                                              : index % 2 === 0
                                                ? "bg-muted/10"
                                                : ""
                                          }`}
                                        >
                                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                            <div className="flex min-w-0 flex-1 items-center gap-1">
                                              <div className="group/checkbox flex w-6 items-center justify-center">
                                                <input
                                                  type="checkbox"
                                                  checked={isSelected}
                                                  onChange={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedRows((prev) => {
                                                      const next = new Set(
                                                        prev,
                                                      );
                                                      if (
                                                        next.has(
                                                          subRow.original._id,
                                                        )
                                                      ) {
                                                        next.delete(
                                                          subRow.original._id,
                                                        );
                                                      } else {
                                                        next.add(
                                                          subRow.original._id,
                                                        );
                                                      }
                                                      return next;
                                                    });
                                                  }}
                                                  className="opacity-0 transition-opacity group-hover/checkbox:opacity-100 checked:opacity-100"
                                                  onClick={(e) =>
                                                    e.stopPropagation()
                                                  }
                                                />
                                              </div>
                                              <StatusSelect
                                                value={subRow.original.status}
                                                onValueChange={(
                                                  status: TaskStatus,
                                                ) =>
                                                  handleUpdateStatus(
                                                    subRow.original._id,
                                                    status,
                                                  )
                                                }
                                              />
                                              <div
                                                className="hover:bg-accent/50 min-w-0 flex-1 cursor-pointer rounded p-2 transition-colors"
                                                onClick={() =>
                                                  handleTaskClick(
                                                    subRow.original,
                                                  )
                                                }
                                              >
                                                <div className="flex items-center gap-2">
                                                  <span className="line-clamp-1 flex-1 text-sm">
                                                    {subRow.original.text}
                                                  </span>
                                                  {(subRow.original
                                                    .subtaskCount ?? 0) > 0 && (
                                                    <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-xs">
                                                      {
                                                        subRow.original
                                                          .completedSubtaskCount
                                                      }
                                                      /
                                                      {
                                                        subRow.original
                                                          .subtaskCount
                                                      }
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="ml-10 flex items-center gap-3 sm:ml-0">
                                              <PrioritySelect
                                                value={subRow.original.priority}
                                                onValueChange={(
                                                  priority: TaskPriority,
                                                ) =>
                                                  handleUpdatePriority(
                                                    subRow.original._id,
                                                    priority,
                                                  )
                                                }
                                              />
                                              {subRow.original.dueDate && (
                                                <div className="text-sm whitespace-nowrap">
                                                  {new Date(
                                                    subRow.original.dueDate,
                                                  ).toLocaleDateString()}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
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
            className="bg-background fixed top-0 right-0 z-50 hidden h-full w-[32rem] border-l shadow-xl md:block"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={handleCloseDetail}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 500 }}
              className="bg-background fixed inset-0 z-50 overflow-y-auto shadow-xl md:hidden"
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

      {/* Bulk action bar */}
      <AnimatePresence>
        {selectedRows.size > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="bg-background fixed right-0 bottom-0 left-0 z-30 border-t shadow-lg"
          >
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedRows.size} task{selectedRows.size > 1 ? "s" : ""}{" "}
                    selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRows(new Set())}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Clear selection
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={handleBulkUpdateStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                      <SelectItem value="duplicate">Duplicate</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedRows.size} task
              {selectedRows.size > 1 ? "s" : ""}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete}>
              Delete {selectedRows.size} task
              {selectedRows.size > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ProjectTasksWrapper({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ProjectTasksContent params={params} />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
