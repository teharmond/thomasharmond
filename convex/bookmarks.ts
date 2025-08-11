import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFolders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("bookmarkFolders")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const getBookmarks = query({
  args: {
    folderId: v.optional(v.id("bookmarkFolders")),
    showAll: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    if (args.showAll) {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .collect();
    } else if (args.folderId) {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user_and_folder", (q) =>
          q.eq("userId", identity.subject).eq("folderId", args.folderId)
        )
        .collect();
    } else {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("folderId"), undefined))
        .collect();
    }
  },
});

export const createFolder = mutation({
  args: {
    name: v.string(),
    parentId: v.optional(v.id("bookmarkFolders")),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("bookmarkFolders", {
      name: args.name,
      userId: identity.subject,
      parentId: args.parentId,
      color: args.color,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateFolder = mutation({
  args: {
    id: v.id("bookmarkFolders"),
    name: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const folder = await ctx.db.get(args.id);
    if (!folder || folder.userId !== identity.subject) {
      throw new Error("Folder not found or unauthorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.name !== undefined) updates.name = args.name;
    if (args.color !== undefined) updates.color = args.color;

    return await ctx.db.patch(args.id, updates);
  },
});

export const deleteFolder = mutation({
  args: {
    id: v.id("bookmarkFolders"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const folder = await ctx.db.get(args.id);
    if (!folder || folder.userId !== identity.subject) {
      throw new Error("Folder not found or unauthorized");
    }

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_folder", (q) => q.eq("folderId", args.id))
      .collect();

    for (const bookmark of bookmarks) {
      await ctx.db.patch(bookmark._id, { folderId: undefined });
    }

    const childFolders = await ctx.db
      .query("bookmarkFolders")
      .withIndex("by_parent", (q) => q.eq("parentId", args.id))
      .collect();

    for (const child of childFolders) {
      await ctx.db.patch(child._id, { parentId: undefined });
    }

    return await ctx.db.delete(args.id);
  },
});

export const createBookmark = mutation({
  args: {
    url: v.string(),
    folderId: v.optional(v.id("bookmarkFolders")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const defaultTitle = new URL(args.url).hostname;

    return await ctx.db.insert("bookmarks", {
      url: args.url,
      title: defaultTitle,
      folderId: args.folderId,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
    folderId: v.optional(v.id("bookmarkFolders")),
    url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const bookmark = await ctx.db.get(args.id);
    if (!bookmark || bookmark.userId !== identity.subject) {
      throw new Error("Bookmark not found or unauthorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.folderId !== undefined) updates.folderId = args.folderId;
    if (args.url !== undefined) updates.url = args.url;

    return await ctx.db.patch(args.id, updates);
  },
});

export const deleteBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const bookmark = await ctx.db.get(args.id);
    if (!bookmark || bookmark.userId !== identity.subject) {
      throw new Error("Bookmark not found or unauthorized");
    }

    return await ctx.db.delete(args.id);
  },
});

export const moveBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
    folderId: v.optional(v.id("bookmarkFolders")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const bookmark = await ctx.db.get(args.id);
    if (!bookmark || bookmark.userId !== identity.subject) {
      throw new Error("Bookmark not found or unauthorized");
    }

    return await ctx.db.patch(args.id, {
      folderId: args.folderId,
      updatedAt: Date.now(),
    });
  },
});

export const createBookmarkWithApiKey = mutation({
  args: {
    url: v.string(),
    userId: v.string(),
    folderId: v.optional(v.id("bookmarkFolders")),
  },
  handler: async (ctx, args) => {
    // Generate a default title from the URL
    const defaultTitle = new URL(args.url).hostname;

    return await ctx.db.insert("bookmarks", {
      url: args.url,
      title: defaultTitle,
      folderId: args.folderId,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
