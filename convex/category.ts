import { v } from "convex/values";
import { getManyVia } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";



export const getCategoriesForUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    return await getManyVia(ctx.db, "userCategories", "categoryId", "userId", userId, "userId");
  },
});

export const getCategoriesForUserByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, { username }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byUsername", q => q.eq("username", username))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return await getManyVia(ctx.db, "userCategories", "categoryId", "userId", user._id, "userId");
  },
});

export const getCategories = query({
  args: {},
  handler: async ctx => {
    return await ctx.db.query("categories").collect();
  },
});
