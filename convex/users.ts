import { v } from "convex/values";

import type { QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";



export const createUser = mutation({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    if(!identity.nickname) {
      throw new Error("nickname is undefined in identity object");
    }

    const user = await getUserHelper(ctx, identity.nickname);

    if (user !== null) {
      if (
        user.name !== identity.name ||
          user.username !== identity.nickname
      ) {
        await ctx.db.patch(user._id, {
          name: identity.name,
          username: identity.nickname,
        });
      }

      return user._id;
    }

    if (!identity.name || !identity.email) {
      throw new Error("Name or email is undefined in identity object");
    }

    return await ctx.db.insert("users", {
      name: identity.name,
      username: identity.nickname,
      email: identity.email,
    });
  },
});

export const getUser = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, { username }) => {
    return await getUserHelper(ctx, username);
  },
});

export function getUserHelper(ctx: QueryCtx, username: string) {
  return ctx.db
    .query("users")
    .withIndex("byUsername", q => q.eq("username", username))
    .unique();
}
