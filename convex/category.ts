import { v } from "convex/values";
import { getManyVia } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";
import { getUserHelper } from "./users";



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
    const user = await getUserHelper(ctx, username);
    if (!user) {
      throw new Error("User not found");
    }

    return await getManyVia(ctx.db, "userCategories", "categoryId", "userId", user._id, "userId");
  },
});
