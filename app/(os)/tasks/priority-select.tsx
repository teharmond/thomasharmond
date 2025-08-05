import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ArrowUp, ArrowDown, Minus } from "lucide-react";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

interface PrioritySelectProps {
  value: TaskPriority;
  onValueChange: (value: TaskPriority) => void;
}

const priorityConfig: Record<
  TaskPriority,
  { label: string; icon: React.ReactNode; color: string }
> = {
  low: {
    label: "Low",
    icon: <ArrowDown className="h-4 w-4" />,
    color: "text-gray-500",
  },
  medium: {
    label: "Medium",
    icon: <Minus className="h-4 w-4" />,
    color: "text-blue-500",
  },
  high: {
    label: "High",
    icon: <ArrowUp className="h-4 w-4" />,
    color: "text-orange-500",
  },
  urgent: {
    label: "Urgent",
    icon: <AlertCircle className="h-4 w-4" />,
    color: "text-red-500",
  },
};

export function PrioritySelect({ value, onValueChange }: PrioritySelectProps) {
  const currentValue = value || "medium";

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[40px] rounded-full md:flex hidden" hideIcon>
        <SelectValue>
          <div
            className={`flex items-center justify-center ${priorityConfig[currentValue].color}`}
          >
            {priorityConfig[currentValue].icon}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(priorityConfig).map(([key, config]) => (
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
