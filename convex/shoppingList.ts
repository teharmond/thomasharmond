import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const getShoppingList = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const items = await ctx.db
      .query("shoppingListItems")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    const now = Date.now();

    // Filter out items that were checked more than 24 hours ago
    const visibleItems = items.filter((item) => {
      if (!item.checked) return true;
      if (!item.checkedAt) return true;
      return now - item.checkedAt < TWENTY_FOUR_HOURS;
    });

    return visibleItems;
  },
});

export const addShoppingItem = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const itemId = await ctx.db.insert("shoppingListItems", {
      name: args.name,
      checked: false,
      userId: identity.subject,
      createdAt: Date.now(),
    });

    return itemId;
  },
});

export const toggleShoppingItem = mutation({
  args: { id: v.id("shoppingListItems") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const item = await ctx.db.get(args.id);
    if (!item || item.userId !== identity.subject) {
      throw new Error("Item not found or unauthorized");
    }

    const newChecked = !item.checked;
    await ctx.db.patch(args.id, {
      checked: newChecked,
      checkedAt: newChecked ? Date.now() : undefined,
    });
  },
});

export const deleteShoppingItem = mutation({
  args: { id: v.id("shoppingListItems") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const item = await ctx.db.get(args.id);
    if (!item || item.userId !== identity.subject) {
      throw new Error("Item not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});

export const updateShoppingItem = mutation({
  args: {
    id: v.id("shoppingListItems"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const item = await ctx.db.get(args.id);
    if (!item || item.userId !== identity.subject) {
      throw new Error("Item not found or unauthorized");
    }

    await ctx.db.patch(args.id, { name: args.name });
  },
});

export const clearCheckedItems = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const items = await ctx.db
      .query("shoppingListItems")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const checkedItems = items.filter((item) => item.checked);

    for (const item of checkedItems) {
      await ctx.db.delete(item._id);
    }

    return checkedItems.length;
  },
});

export const addIngredientsFromRecipe = mutation({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe || recipe.userId !== identity.subject) {
      throw new Error("Recipe not found or unauthorized");
    }

    const itemIds = [];
    for (const ingredient of recipe.ingredients) {
      const itemId = await ctx.db.insert("shoppingListItems", {
        name: `${ingredient.amount} ${ingredient.name}`,
        checked: false,
        userId: identity.subject,
        createdAt: Date.now(),
      });
      itemIds.push(itemId);
    }

    return itemIds;
  },
});
