import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMealPlansForDateRange = query({
  args: {
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const mealPlans = await ctx.db
      .query("mealPlans")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    // Filter by date range
    const filteredPlans = mealPlans.filter(
      (plan) => plan.date >= args.startDate && plan.date <= args.endDate
    );

    // Get recipe details for each plan
    const plansWithRecipes = await Promise.all(
      filteredPlans.map(async (plan) => {
        const recipe = await ctx.db.get(plan.recipeId);
        return {
          ...plan,
          recipe: recipe || null,
        };
      })
    );

    return plansWithRecipes;
  },
});

export const getMealPlansForDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const mealPlans = await ctx.db
      .query("mealPlans")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", identity.subject).eq("date", args.date)
      )
      .collect();

    // Get recipe details for each plan
    const plansWithRecipes = await Promise.all(
      mealPlans.map(async (plan) => {
        const recipe = await ctx.db.get(plan.recipeId);
        return {
          ...plan,
          recipe: recipe || null,
        };
      })
    );

    return plansWithRecipes;
  },
});

export const addMealPlan = mutation({
  args: {
    date: v.string(),
    mealType: v.union(
      v.literal("breakfast"),
      v.literal("lunch"),
      v.literal("dinner"),
      v.literal("other")
    ),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify recipe exists and belongs to user
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe || recipe.userId !== identity.subject) {
      throw new Error("Recipe not found or unauthorized");
    }

    const mealPlanId = await ctx.db.insert("mealPlans", {
      date: args.date,
      mealType: args.mealType,
      recipeId: args.recipeId,
      userId: identity.subject,
      createdAt: Date.now(),
    });

    return mealPlanId;
  },
});

export const removeMealPlan = mutation({
  args: { id: v.id("mealPlans") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const mealPlan = await ctx.db.get(args.id);
    if (!mealPlan || mealPlan.userId !== identity.subject) {
      throw new Error("Meal plan not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});

export const updateMealPlan = mutation({
  args: {
    id: v.id("mealPlans"),
    date: v.optional(v.string()),
    mealType: v.optional(
      v.union(
        v.literal("breakfast"),
        v.literal("lunch"),
        v.literal("dinner"),
        v.literal("other")
      )
    ),
    recipeId: v.optional(v.id("recipes")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const mealPlan = await ctx.db.get(args.id);
    if (!mealPlan || mealPlan.userId !== identity.subject) {
      throw new Error("Meal plan not found or unauthorized");
    }

    const updates: Record<string, unknown> = {};
    if (args.date !== undefined) updates.date = args.date;
    if (args.mealType !== undefined) updates.mealType = args.mealType;
    if (args.recipeId !== undefined) {
      // Verify recipe exists and belongs to user
      const recipe = await ctx.db.get(args.recipeId);
      if (!recipe || recipe.userId !== identity.subject) {
        throw new Error("Recipe not found or unauthorized");
      }
      updates.recipeId = args.recipeId;
    }

    await ctx.db.patch(args.id, updates);
  },
});
