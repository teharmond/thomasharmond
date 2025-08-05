import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const statusValues = v.union(
  v.literal("backlog"),
  v.literal("todo"),
  v.literal("in_progress"),
  v.literal("completed"),
  v.literal("canceled"),
  v.literal("duplicate")
);

const priorityValues = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
  v.literal("urgent")
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
    
    // Add defaults for old tasks that don't have status/priority
    return tasks.map(task => ({
      ...task,
      status: task.status || (task.completed ? "completed" : "todo"),
      priority: task.priority || "medium"
    }));
  },
});

export const createTask = mutation({
  args: { 
    text: v.string(),
    status: v.optional(statusValues),
    priority: v.optional(priorityValues),
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