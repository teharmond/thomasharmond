"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderOpen } from "lucide-react";

interface ProjectSelectProps {
  value?: Id<"projects">;
  onValueChange: (value?: Id<"projects">) => void;
  placeholder?: string;
}

export function ProjectSelect({
  value,
  onValueChange,
  placeholder = "Select project",
}: ProjectSelectProps) {
  const { isSignedIn } = useUser();
  const projects = useQuery(
    api.projects.getProjects,
    isSignedIn ? undefined : "skip",
  );

  return (
    <Select
      value={value || "none"}
      onValueChange={(newValue) => {
        if (newValue === "none") {
          onValueChange(undefined);
        } else {
          onValueChange(newValue as Id<"projects">);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-300" />
            <span>No project</span>
          </div>
        </SelectItem>
        {projects?.map((project) => (
          <SelectItem key={project._id} value={project._id}>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  project.color || "bg-gray-400"
                }`}
              />
              <span>{project.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
