import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { StatusSelect, TaskStatus } from "./status-select";
import { PrioritySelect, TaskPriority } from "./priority-select";

interface TaskItemProps {
  task: {
    _id: string;
    text: string;
    status: TaskStatus;
    priority: TaskPriority;
  };
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onUpdatePriority: (id: string, priority: TaskPriority) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  onUpdateStatus,
  onUpdatePriority,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg ">
      <div className="flex-1 text-sm">
        <span
          className={
            task.status === "completed"
              ? "line-through text-muted-foreground"
              : task.status === "canceled"
                ? "line-through text-muted-foreground opacity-50"
                : ""
          }
        >
          {task.text}
        </span>
      </div>
      <PrioritySelect
        value={task.priority}
        onValueChange={(priority) => onUpdatePriority(task._id, priority)}
      />
      <StatusSelect
        value={task.status}
        onValueChange={(status) => onUpdateStatus(task._id, status)}
      />
      <Button variant="outline" size="sm" onClick={() => onDelete(task._id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
