import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskStatus = "backlog" | "todo" | "in_progress" | "completed" | "canceled" | "duplicate";

interface StatusSelectProps {
  value: TaskStatus;
  onValueChange: (value: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  backlog: { label: "Backlog", color: "text-gray-500" },
  todo: { label: "Todo", color: "text-blue-500" },
  in_progress: { label: "In Progress", color: "text-yellow-500" },
  completed: { label: "Completed", color: "text-green-500" },
  canceled: { label: "Canceled", color: "text-red-500" },
  duplicate: { label: "Duplicate", color: "text-purple-500" },
};

export function StatusSelect({ value, onValueChange }: StatusSelectProps) {
  const currentValue = value || "todo";
  
  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue>
          <span className={statusConfig[currentValue].color}>
            {statusConfig[currentValue].label}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusConfig).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <span className={config.color}>{config.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}