import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRecipes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipes = await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return recipes;
  },
});

export const getRecipe = query({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipe = await ctx.db.get(args.id);
    if (!recipe || recipe.userId !== identity.subject) {
      throw new Error("Recipe not found or unauthorized");
    }

    return recipe;
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    ingredients: v.array(
      v.object({
        name: v.string(),
        amount: v.string(),
      })
    ),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipeId = await ctx.db.insert("recipes", {
      title: args.title,
      ingredients: args.ingredients,
      tags: args.tags,
      imageUrl: args.imageUrl,
      sourceUrl: args.sourceUrl,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return recipeId;
  },
});

export const updateRecipe = mutation({
  args: {
    id: v.id("recipes"),
    title: v.optional(v.string()),
    ingredients: v.optional(
      v.array(
        v.object({
          name: v.string(),
          amount: v.string(),
        })
      )
    ),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipe = await ctx.db.get(args.id);
    if (!recipe || recipe.userId !== identity.subject) {
      throw new Error("Recipe not found or unauthorized");
    }

    const updates: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.title !== undefined) updates.title = args.title;
    if (args.ingredients !== undefined) updates.ingredients = args.ingredients;
    if (args.tags !== undefined) updates.tags = args.tags;
    if (args.imageUrl !== undefined) updates.imageUrl = args.imageUrl;
    if (args.sourceUrl !== undefined) updates.sourceUrl = args.sourceUrl;

    await ctx.db.patch(args.id, updates);
  },
});

export const deleteRecipe = mutation({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const recipe = await ctx.db.get(args.id);
    if (!recipe || recipe.userId !== identity.subject) {
      throw new Error("Recipe not found or unauthorized");
    }

    // Also delete any meal plans that reference this recipe
    const mealPlans = await ctx.db
      .query("mealPlans")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const plan of mealPlans) {
      await ctx.db.delete(plan._id);
    }

    await ctx.db.delete(args.id);
  },
});
