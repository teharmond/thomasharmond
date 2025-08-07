import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    status: v.optional(v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("canceled"),
      v.literal("duplicate")
    )),
    priority: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    )),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    startDate: v.optional(v.string()),
    userId: v.string(),
    createdAt: v.number(),
    completed: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),
  
  subtasks: defineTable({
    taskId: v.id("tasks"),
    text: v.string(),
    status: v.union(
      v.literal("todo"),
      v.literal("completed")
    ),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_task", ["taskId"])
    .index("by_user", ["userId"]),
});