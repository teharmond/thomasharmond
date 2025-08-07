import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSubtasks = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    const subtasks = await ctx.db
      .query("subtasks")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .order("asc")
      .collect();
    
    return subtasks;
  },
});

export const createSubtask = mutation({
  args: { 
    taskId: v.id("tasks"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Task not found or unauthorized");
    }

    return await ctx.db.insert("subtasks", {
      taskId: args.taskId,
      text: args.text,
      status: "todo",
      userId: identity.subject,
      createdAt: Date.now(),
    });
  },
});

export const updateSubtaskStatus = mutation({
  args: { 
    id: v.id("subtasks"),
    status: v.union(v.literal("todo"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const subtask = await ctx.db.get(args.id);
    if (!subtask || subtask.userId !== identity.subject) {
      throw new Error("Subtask not found or unauthorized");
    }

    return await ctx.db.patch(args.id, { status: args.status });
  },
});

export const deleteSubtask = mutation({
  args: { id: v.id("subtasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const subtask = await ctx.db.get(args.id);
    if (!subtask || subtask.userId !== identity.subject) {
      throw new Error("Subtask not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});