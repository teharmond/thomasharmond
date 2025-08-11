import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const statusValues = v.union(
  v.literal("backlog"),
  v.literal("todo"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("canceled"),
  v.literal("duplicate"),
);

const priorityValues = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
  v.literal("urgent"),
);

export const getTasks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    // Get subtask counts for all tasks
    const tasksWithSubtaskCounts = await Promise.all(
      tasks.map(async (task) => {
        const subtasks = await ctx.db
          .query("subtasks")
          .withIndex("by_task", (q) => q.eq("taskId", task._id))
          .collect();

        const completedSubtasks = subtasks.filter(
          (s) => s.status === "completed",
        ).length;

        return {
          ...task,
          status: task.status || (task.completed ? "completed" : "todo"),
          priority: task.priority || "medium",
          subtaskCount: subtasks.length,
          completedSubtaskCount: completedSubtasks,
        };
      }),
    );

    return tasksWithSubtaskCounts;
  },
});

export const getTasksByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();

    // Get subtask counts for all tasks
    const tasksWithSubtaskCounts = await Promise.all(
      tasks.map(async (task) => {
        const subtasks = await ctx.db
          .query("subtasks")
          .withIndex("by_task", (q) => q.eq("taskId", task._id))
          .collect();

        const completedSubtasks = subtasks.filter(
          (s) => s.status === "completed",
        ).length;

        return {
          ...task,
          status: task.status || (task.completed ? "completed" : "todo"),
          priority: task.priority || "medium",
          subtaskCount: subtasks.length,
          completedSubtaskCount: completedSubtasks,
        };
      }),
    );

    return tasksWithSubtaskCounts;
  },
});

export const getTaskById = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    // Get subtask counts
    const subtasks = await ctx.db
      .query("subtasks")
      .withIndex("by_task", (q) => q.eq("taskId", args.id))
      .collect();

    const completedSubtasks = subtasks.filter(
      (s) => s.status === "completed",
    ).length;

    // Add defaults for old tasks that don't have status/priority
    return {
      ...task,
      status: task.status || (task.completed ? "completed" : "todo"),
      priority: task.priority || "medium",
      subtaskCount: subtasks.length,
      completedSubtaskCount: completedSubtasks,
    };
  },
});

export const createTask = mutation({
  args: {
    text: v.string(),
    status: v.optional(statusValues),
    priority: v.optional(priorityValues),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    startDate: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("tasks", {
      text: args.text,
      status: args.status || "todo",
      priority: args.priority || "medium",
      description: args.description,
      dueDate: args.dueDate,
      startDate: args.startDate,
      projectId: args.projectId,
      userId: identity.subject,
      createdAt: Date.now(),
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    status: v.optional(statusValues),
    priority: v.optional(priorityValues),
    text: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    startDate: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    const updates: any = {};
    if (args.status !== undefined) updates.status = args.status;
    if (args.priority !== undefined) updates.priority = args.priority;
    if (args.text !== undefined) updates.text = args.text;
    if (args.description !== undefined) updates.description = args.description;
    if (args.dueDate !== undefined) updates.dueDate = args.dueDate;
    if (args.startDate !== undefined) updates.startDate = args.startDate;
    if ("projectId" in args) updates.projectId = args.projectId;

    return await ctx.db.patch(args.id, updates);
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

export const createTaskWithApiKey = mutation({
  args: {
    text: v.string(),
    userId: v.string(),
    status: v.optional(statusValues),
    priority: v.optional(priorityValues),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    startDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      text: args.text,
      status: args.status || "todo",
      priority: args.priority || "medium",
      description: args.description,
      dueDate: args.dueDate,
      startDate: args.startDate,
      userId: args.userId,
      createdAt: Date.now(),
    });
  },
});

export const bulkDeleteTasks = mutation({
  args: { ids: v.array(v.id("tasks")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify all tasks belong to the user before deleting
    for (const id of args.ids) {
      const task = await ctx.db.get(id);
      if (!task || task.userId !== identity.subject) {
        throw new Error("Task not found or unauthorized");
      }
    }

    // Delete all tasks
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }

    return { deleted: args.ids.length };
  },
});

export const bulkUpdateStatus = mutation({
  args: {
    ids: v.array(v.id("tasks")),
    status: statusValues,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify all tasks belong to the user before updating
    for (const id of args.ids) {
      const task = await ctx.db.get(id);
      if (!task || task.userId !== identity.subject) {
        throw new Error("Task not found or unauthorized");
      }
    }

    // Update all tasks
    for (const id of args.ids) {
      await ctx.db.patch(id, { status: args.status });
    }

    return { updated: args.ids.length };
  },
});
