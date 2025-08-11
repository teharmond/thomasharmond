import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
    createdAt: v.number(),
    color: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  tasks: defineTable({
    text: v.string(),
    status: v.optional(
      v.union(
        v.literal("backlog"),
        v.literal("todo"),
        v.literal("in_progress"),
        v.literal("completed"),
        v.literal("canceled"),
        v.literal("duplicate"),
      ),
    ),
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent"),
      ),
    ),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    startDate: v.optional(v.string()),
    userId: v.string(),
    createdAt: v.number(),
    completed: v.optional(v.boolean()),
    projectId: v.optional(v.id("projects")),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"]),

  subtasks: defineTable({
    taskId: v.id("tasks"),
    text: v.string(),
    status: v.union(v.literal("todo"), v.literal("completed")),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_task", ["taskId"])
    .index("by_user", ["userId"]),

  bookmarkFolders: defineTable({
    name: v.string(),
    userId: v.string(),
    parentId: v.optional(v.id("bookmarkFolders")),
    createdAt: v.number(),
    updatedAt: v.number(),
    color: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_parent", ["parentId"]),

  bookmarks: defineTable({
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    favicon: v.optional(v.string()),
    image: v.optional(v.string()),
    folderId: v.optional(v.id("bookmarkFolders")),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_folder", ["folderId"])
    .index("by_user_and_folder", ["userId", "folderId"]),
});
