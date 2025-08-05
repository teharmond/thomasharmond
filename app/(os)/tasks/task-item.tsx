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
  onClick?: () => void;
}

export function TaskItem({
  task,
  onUpdateStatus,
  onUpdatePriority,
  onDelete,
  onClick,
}: TaskItemProps) {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <StatusSelect
          value={task.status}
          onValueChange={(status) => onUpdateStatus(task._id, status)}
        />
      </div>
      <div className="flex-1 text-sm">
        <span
          className={
            task.status === "completed" || task.status === "duplicate"
              ? "line-through text-muted-foreground"
              : task.status === "canceled"
                ? "line-through text-muted-foreground opacity-50"
                : ""
          }
        >
          {task.text}
        </span>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <PrioritySelect
          value={task.priority}
          onValueChange={(priority) => onUpdatePriority(task._id, priority)}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="hidden md:flex"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task._id);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
