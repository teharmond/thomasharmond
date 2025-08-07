"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ColumnDef,
  ExpandedState,
  OnChangeFn,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Archive,
  CheckCircle2,
  Circle,
  Copy,
  Loader2,
  PlusIcon,
  Triangle,
  XCircle,
} from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import { PrioritySelect, TaskPriority } from "../../app/(os)/tasks/priority-select";
import { StatusSelect, TaskStatus } from "../../app/(os)/tasks/status-select";

export type Task = {
  _id: string;
  text: string;
  status: TaskStatus;
  priority: TaskPriority;
  description?: string;
  dueDate?: string;
  userId: string;
  createdAt: number;
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

interface TaskTableProps {
  tasks: Task[];
  groupExpanded: ExpandedState;
  selectedRows: Set<string>;
  onExpandedChange: OnChangeFn<ExpandedState>;
  onTaskClick: (task: Task) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onUpdatePriority: (id: string, priority: TaskPriority) => void;
  onSelectedRowsChange: (selectedRows: Set<string>) => void;
  onOpenDialogWithStatus: (status?: TaskStatus) => void;
}

export function TaskTable({
  tasks,
  groupExpanded,
  selectedRows,
  onExpandedChange,
  onTaskClick,
  onUpdateStatus,
  onUpdatePriority,
  onSelectedRowsChange,
  onOpenDialogWithStatus,
}: TaskTableProps) {
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
    []
  );

  const table = useReactTable({
    data: tasks || [],
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
    onExpandedChange,
    groupedColumnMode: false,
    autoResetExpanded: false,
    autoResetPageIndex: false,
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No tasks yet. Add one above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {table.getRowModel().rows.map((row, index, rows) => {
        if (row.getIsGrouped()) {
          const groupValue = row.getGroupingValue("status") as TaskStatus;
          const group = statusGroups[groupValue];
          const isExpanded = row.getIsExpanded();
          const tasksCount = row.subRows.length;

          if (tasksCount === 0) return null;

          const lastVisibleIndex = rows.findLastIndex(
            (r) => r.getIsGrouped() && r.subRows.length > 0
          );
          const isLastVisible = index === lastVisibleIndex;

          return (
            <div
              key={row.id}
              className={`bg-card ${
                !isLastVisible && isExpanded ? "border-b" : ""
              }`}
            >
              <Collapsible
                open={isExpanded}
                onOpenChange={(open) => {
                  row.toggleExpanded(open);
                }}
              >
                <div className="flex items-center justify-between w-full bg-muted h-9 border-b pr-6">
                  <div className="flex items-center gap-1.5">
                    <CollapsibleTrigger className="flex items-center group/collapsible-trigger gap-2 pl-3 pr-0 w-7 py-1 text-sm hover:bg-accent bg-muted transition-colors justify-between">
                      {isExpanded ? (
                        <Triangle className="h-2 w-2 rotate-180 text-muted-foreground fill-muted-foreground group-hover/collapsible-trigger:fill-foreground group-hover/collapsible-trigger:text-foreground" />
                      ) : (
                        <Triangle className="h-2 w-2 mr-1 fill-foreground text-foreground rotate-90" />
                      )}
                    </CollapsibleTrigger>
                    <div className="flex items-center gap-2">
                      <span className={group.color}>{group.icon}</span>
                      <span className="text-sm text-secondary-foreground">
                        {group.label}
                      </span>
                      <span className="text-muted-foreground text-sm ml-auto bg-muted px-2 py-1 rounded">
                        {tasksCount}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-foreground/10 text-muted-foreground hover:text-foreground"
                    onClick={() => onOpenDialogWithStatus(groupValue)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
                <CollapsibleContent>
                  <div>
                    <div className="bg-background">
                      <div className="w-full">
                        {row.subRows.map((subRow, index) => {
                          const isSelected = selectedRows.has(subRow.original._id);
                          return (
                            <div
                              key={subRow.id}
                              className={`border-b last:border-b-0 hover:bg-muted/30 transition-colors pr-6 pl-1 py-1 ${
                                isSelected
                                  ? "bg-secondary/30 hover:bg-secondary/30"
                                  : index % 2 === 0
                                    ? "bg-muted/10"
                                    : ""
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                  <div className="w-6 flex items-center justify-center group/checkbox">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        const next = new Set(selectedRows);
                                        if (next.has(subRow.original._id)) {
                                          next.delete(subRow.original._id);
                                        } else {
                                          next.add(subRow.original._id);
                                        }
                                        onSelectedRowsChange(next);
                                      }}
                                      className="opacity-0 group-hover/checkbox:opacity-100 checked:opacity-100 transition-opacity"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                  <StatusSelect
                                    value={subRow.original.status}
                                    onValueChange={(status: TaskStatus) =>
                                      onUpdateStatus(subRow.original._id, status)
                                    }
                                  />
                                  <div
                                    className="cursor-pointer hover:bg-accent/50 p-2 rounded transition-colors flex-1 min-w-0"
                                    onClick={() => onTaskClick(subRow.original)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm line-clamp-1 flex-1">
                                        {subRow.original.text}
                                      </span>
                                      {(subRow.original.subtaskCount ?? 0) > 0 && (
                                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                          {subRow.original.completedSubtaskCount}/
                                          {subRow.original.subtaskCount}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 ml-10 sm:ml-0">
                                  <PrioritySelect
                                    value={subRow.original.priority}
                                    onValueChange={(priority: TaskPriority) =>
                                      onUpdatePriority(
                                        subRow.original._id,
                                        priority
                                      )
                                    }
                                  />
                                  {subRow.original.dueDate && (
                                    <div className="text-sm whitespace-nowrap">
                                      {new Date(
                                        subRow.original.dueDate
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
  );
}