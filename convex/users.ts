import { v } from "convex/values";
import { getManyFrom, getManyVia } from "convex-helpers/server/relationships";

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
    console.log(user);
    if (user !== null) {
      if (
        user.firstName !== identity.name ||
          user.username !== identity.nickname
      ) {
        await ctx.db.patch(user._id, {
          firstName: identity.name,
          lastName: identity.familyName,
          phoneNumber: identity.phoneNumber,
          username: identity.nickname,
          email: identity.email,
        });
      }

      return user._id;
    }

    if (!identity.name || !identity.email || !identity.nickname || !identity.familyName || !identity.phoneNumber) {
      throw new Error("Name or email is undefined in identity object");
    }

    return await ctx.db.insert("users", {
      firstName: identity.name,
      lastName: identity.familyName,
      phoneNumber: identity.phoneNumber,
      username: identity.nickname,
      email: identity.email,
      expert: false,
      verified: false,
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
    .withIndex("byUsernameAndEmail", q => q.eq("username", username))
    .unique();
}

export const getUsers = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("users")
      .order("desc")
      .filter(q => q.not(q.eq("email", email)))
      .collect();
  },
});

export const getUsersForConversationById = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const conversation = await ctx.db.get(conversationId);
    // Get the users in this conversation and their associated user ids
    const users_ = await getManyVia(ctx.db, "userConversations", "userId", "userId", conversationId, "conversationId");
  },
});
