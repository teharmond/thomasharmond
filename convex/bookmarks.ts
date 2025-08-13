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
    showUncategorized: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    if (args.showAll) {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .collect();
    } else if (args.showUncategorized) {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user", (q) => q.eq("userId", identity.subject))
        .filter((q) => q.eq(q.field("folderId"), undefined))
        .collect();
    } else if (args.folderId) {
      return await ctx.db
        .query("bookmarks")
        .withIndex("by_user_and_folder", (q) =>
          q.eq("userId", identity.subject).eq("folderId", args.folderId),
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

async function fetchOpenGraphData(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkBot/1.0)",
      },
    });

    if (!response.ok) {
      return { title: new URL(url).hostname, image: null, favicon: null };
    }

    const html = await response.text();

    const getMetaContent = (property: string): string | null => {
      const regex = new RegExp(
        `<meta[^>]*(?:property|name)=["'](?:og:)?${property}["'][^>]*content=["']([^"']+)["']`,
        "i",
      );
      const match = html.match(regex);
      if (match) return match[1];

      const reverseRegex = new RegExp(
        `<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:)?${property}["']`,
        "i",
      );
      const reverseMatch = html.match(reverseRegex);
      return reverseMatch ? reverseMatch[1] : null;
    };

    const getTitleFromTag = (): string | null => {
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return match ? match[1].trim() : null;
    };

    const getFavicon = (): string | null => {
      const iconRegex =
        /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i;
      const match = html.match(iconRegex);

      if (match) {
        const favicon = match[1];
        if (favicon.startsWith("http")) {
          return favicon;
        } else if (favicon.startsWith("//")) {
          return `https:${favicon}`;
        } else if (favicon.startsWith("/")) {
          const urlObj = new URL(url);
          return `${urlObj.origin}${favicon}`;
        } else {
          const urlObj = new URL(url);
          const path = urlObj.pathname.split("/").slice(0, -1).join("/");
          return `${urlObj.origin}${path}/${favicon}`;
        }
      }

      const urlObj = new URL(url);
      return `${urlObj.origin}/favicon.ico`;
    };

    const decodeHtmlEntities = (text: string): string => {
      return text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([a-fA-F0-9]+);/g, (_, code) =>
          String.fromCharCode(parseInt(code, 16)),
        )
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
    };

    const rawTitle =
      getMetaContent("title") || getTitleFromTag() || new URL(url).hostname;
    const title = decodeHtmlEntities(rawTitle);
    const image = getMetaContent("image");
    const favicon = getFavicon();

    return { title, image, favicon };
  } catch (error) {
    return { title: new URL(url).hostname, image: null, favicon: null };
  }
}

export const createBookmark = mutation({
  args: {
    url: v.string(),
    folderId: v.optional(v.id("bookmarkFolders")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Fetch OpenGraph data
    const ogData = await fetchOpenGraphData(args.url);

    return await ctx.db.insert("bookmarks", {
      url: args.url,
      title: ogData.title,
      image: ogData.image || undefined,
      favicon: ogData.favicon || undefined,
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
    title: v.optional(v.string()),
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
    if (args.title !== undefined) updates.title = args.title;

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
    // Fetch OpenGraph data
    const ogData = await fetchOpenGraphData(args.url);

    return await ctx.db.insert("bookmarks", {
      url: args.url,
      title: ogData.title,
      image: ogData.image || undefined,
      favicon: ogData.favicon || undefined,
      folderId: args.folderId,
      userId: args.userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
