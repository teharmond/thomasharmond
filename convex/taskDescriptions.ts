// Temporary implementation until components.prosemirrorSync is available
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Placeholder sync API functions that match the expected interface
export const getSnapshot = query({
  args: { id: v.string(), version: v.optional(v.number()) },
  handler: async (ctx, { id, version }) => {
    // Return empty document for now
    return { content: null };
  },
});

export const submitSnapshot = mutation({
  args: { id: v.string(), version: v.number(), content: v.string() },
  handler: async (ctx, { id, version, content }) => {
    // Placeholder - in real implementation this would save to prosemirror sync tables
  },
});

export const latestVersion = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    return null;
  },
});

export const getSteps = query({
  args: { id: v.string(), version: v.number() },
  handler: async (ctx, { id, version }) => {
    return { clientIds: [], steps: [], version: 0 };
  },
});

export const submitSteps = mutation({
  args: { 
    id: v.string(), 
    version: v.number(), 
    clientId: v.union(v.string(), v.number()), 
    steps: v.array(v.string()) 
  },
  handler: async (ctx, { id, version, clientId, steps }) => {
    return { status: "synced" as const };
  },
});