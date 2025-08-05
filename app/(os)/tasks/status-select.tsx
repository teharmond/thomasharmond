import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Archive,
  Circle,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
} from "lucide-react";

export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "completed"
  | "canceled"
  | "duplicate";

interface StatusSelectProps {
  value: TaskStatus;
  onValueChange: (value: TaskStatus) => void;
}

const statusConfig: Record<
  TaskStatus,
  { label: string; icon: React.ReactNode; color: string }
> = {
  backlog: {
    label: "Backlog",
    icon: <Archive className="h-3.5 w-3.5" />,
    color: "text-gray-500",
  },
  todo: {
    label: "Todo",
    icon: <Circle className="h-3.5 w-3.5" />,
    color: "text-blue-500",
  },
  in_progress: {
    label: "In Progress",
    icon: <Loader2 className="h-3.5 w-3.5" />,
    color: "text-yellow-500",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    color: "text-green-500",
  },
  canceled: {
    label: "Canceled",
    icon: <XCircle className="h-3.5 w-3.5" />,
    color: "text-red-500",
  },
  duplicate: {
    label: "Duplicate",
    icon: <Copy className="h-3.5 w-3.5" />,
    color: "text-purple-500",
  },
};

export function StatusSelect({ value, onValueChange }: StatusSelectProps) {
  const currentValue = value || "todo";

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger
        className="w-[20px] h-[20px] border-none p-0 items-center justify-center"
        hideIcon
      >
        <SelectValue>
          <div
            className={`flex items-center justify-center ${statusConfig[currentValue].color}`}
          >
            {statusConfig[currentValue].icon}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusConfig).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <div className={`flex items-center gap-1 ${config.color}`}>
              {config.icon}
              <span>{config.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
