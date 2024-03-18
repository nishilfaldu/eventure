import { v } from "convex/values";
import { getManyVia } from "convex-helpers/server/relationships";

import type { QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";



export const createUser = mutation({
  args: {},
  handler: async ctx => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    if(!identity.email) {
      throw new Error("email is undefined in identity object");
    }

    const user = await getUserHelper(ctx, identity.email);
    if (user !== null) {
      console.log("user already exists");
      if (
        user.firstName !== identity.name ||
          user.username !== identity.nickname ||
            user.email !== identity.email ||
                user.lastName !== identity.familyName ||
                    user.phoneNumber !== identity.phoneNumber ||
                    user.pictureUrl !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          firstName: identity.name,
          lastName: identity.familyName,
          phoneNumber: identity.phoneNumber,
          username: identity.nickname,
          email: identity.email,
          pictureUrl: identity.pictureUrl,
        });
      }

      return user._id;
    }

    if (!identity.name || !identity.email || !identity.nickname || !identity.familyName || !identity.phoneNumber) {
      throw new Error("Name or email is undefined in identity object");
    }

    console.log("here in store - new user created");

    return await ctx.db.insert("users", {
      pictureUrl: identity.pictureUrl,
      tokenIdentifier: identity.tokenIdentifier,
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

export function getUserHelper(ctx: QueryCtx, email: string) {
  return ctx.db
    .query("users")
    .withIndex("byEmail", q => q.eq("email", email))
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

// get conversationById
export const getUsersForConversationId = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    // Get the users in this conversation and their associated user ids
    const users = await getManyVia(ctx.db, "userConversations", "userId", "conversationId", conversationId, "conversationId");

    return users;
  },
});

export const getUsersForCategoryId = query({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, { categoryId }) => {
    // Get the users in this category and their associated user ids
    const users = await getManyVia(ctx.db, "userCategories", "userId", "categoryId", categoryId, "categoryId");

    return users;
  },
});
