"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FolderOpen,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useState, useTransition } from "react";
import { Id } from "@/convex/_generated/dataModel";

export type Project = {
  _id: Id<"projects">;
  name: string;
  description?: string;
  color?: string;
  userId: string;
  createdAt: number;
  taskCount?: number;
  completedTaskCount?: number;
};

const projectColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Teal", value: "bg-teal-500" },
];

function ProjectsContent() {
  const { isSignedIn, isLoaded } = useUser();
  const [, startTransition] = useTransition();
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("");

  const projectsFromDb = useQuery(
    api.projects.getProjects,
    isSignedIn ? undefined : "skip"
  );
  const createProject = useMutation(api.projects.createProject);
  const bulkDeleteProjects = useMutation(api.projects.bulkDeleteProjects);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

    startTransition(async () => {
      try {
        await createProject({
          name: newProjectName.trim(),
          description: newProjectDescription.trim() || undefined,
          color: newProjectColor || undefined,
        });
        setNewProjectName("");
        setNewProjectDescription("");
        setNewProjectColor("");
        setShowCreateDialog(false);
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    });
  };

  const handleBulkDelete = async () => {
    if (selectedRows.size === 0) return;

    const idsToDelete = Array.from(selectedRows) as Id<"projects">[];
    setSelectedRows(new Set());
    setShowDeleteDialog(false);

    startTransition(async () => {
      try {
        await bulkDeleteProjects({ ids: idsToDelete });
      } catch (error) {
        console.error("Failed to bulk delete projects:", error);
      }
    });
  };

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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 h-full">
        <header className="border-b sticky top-0 h-10 pl-2 pr-6 flex items-center justify-between">
          <span className="text-sm flex gap-3 items-center text-secondary-foreground font-medium">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </span>
          <Button
            size="sm"
            className="h-7 text-xs px-3"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Project
          </Button>
        </header>
        
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            {!projectsFromDb || projectsFromDb.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">
                  No projects yet. Add one above!
                </p>
              </div>
            ) : (
              <div className="w-full">
                <div className="border-b bg-muted/50">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-muted-foreground">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedRows.size > 0 && selectedRows.size === projectsFromDb.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows(new Set(projectsFromDb.map(p => p._id)));
                          } else {
                            setSelectedRows(new Set());
                          }
                        }}
                        className="transition-opacity"
                      />
                    </div>
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Description</div>
                    <div className="col-span-2">Progress</div>
                    <div className="col-span-2">Tasks</div>
                  </div>
                </div>
                <div className="divide-y">
                  {projectsFromDb.map((project, index) => {
                    const isSelected = selectedRows.has(project._id);
                    const progress = project.taskCount 
                      ? (project.completedTaskCount || 0) / project.taskCount 
                      : 0;
                    
                    return (
                      <div
                        key={project._id}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/30 transition-colors ${
                          isSelected ? "bg-secondary/30" : index % 2 === 0 ? "bg-muted/10" : ""
                        }`}
                      >
                        <div className="col-span-1 flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              e.stopPropagation();
                              setSelectedRows((prev) => {
                                const next = new Set(prev);
                                if (next.has(project._id)) {
                                  next.delete(project._id);
                                } else {
                                  next.add(project._id);
                                }
                                return next;
                              });
                            }}
                            className="transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="col-span-4">
                          <Link
                            href={`/projects/${project._id}`}
                            className="group flex items-center gap-3 hover:text-primary transition-colors"
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                project.color || "bg-gray-400"
                              }`}
                            />
                            <span className="font-medium truncate group-hover:underline">
                              {project.name}
                            </span>
                          </Link>
                        </div>
                        <div className="col-span-3">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description || "No description"}
                          </p>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <div className="w-full">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>{Math.round(progress * 100)}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${progress * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="text-sm text-muted-foreground">
                            {project.completedTaskCount || 0} / {project.taskCount || 0}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selectedRows.size > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-30"
          >
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {selectedRows.size} project{selectedRows.size > 1 ? "s" : ""}{" "}
                    selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRows(new Set())}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear selection
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create project dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to organize your tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Enter project description (optional)"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Color</Label>
              <Select value={newProjectColor} onValueChange={setNewProjectColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a color" />
                </SelectTrigger>
                <SelectContent>
                  {projectColors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color.value}`} />
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedRows.size} project
              {selectedRows.size > 1 ? "s" : ""}? This will remove the project
              association from all tasks but won't delete the tasks themselves.
              This action cannot be undone.
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
              Delete {selectedRows.size} project
              {selectedRows.size > 1 ? "s" : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ProjectsWrapper() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';