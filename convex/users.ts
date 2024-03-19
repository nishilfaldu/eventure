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
        user.firstName !== identity.givenName ||
          user.username !== identity.nickname ||
            user.email !== identity.email ||
                user.lastName !== identity.familyName ||
                    user.phoneNumber !== identity.phoneNumber ||
                    user.pictureUrl !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          firstName: identity.givenName,
          lastName: identity.familyName,
          phoneNumber: identity.phoneNumber,
          username: identity.nickname,
          email: identity.email,
          pictureUrl: identity.pictureUrl,
        });
      }

      return user._id;
    }

    if (!identity.givenName || !identity.email || !identity.nickname || !identity.familyName
        || !identity.phoneNumber || !identity.pictureUrl) {
      throw new Error("Name or email is undefined in identity object");
    }

    console.log("here in store - new user created");

    return await ctx.db.insert("users", {
      pictureUrl: identity.pictureUrl,
      tokenIdentifier: identity.tokenIdentifier,
      firstName: identity.givenName,
      lastName: identity.familyName,
      phoneNumber: identity.phoneNumber,
      username: identity.nickname,
      email: identity.email,
      expert: false,
      verified: false,
    });
  },
});

export const getUserByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, { username }) => {
    return ctx.db
      .query("users")
      .withIndex("byUsername", q => q.eq("username", username))
      .unique();
  },
});

export const becomeProfessional = mutation({
  args: {
    gender: v.union(v.literal("Male"), v.literal("Female"), v.literal("Other")),
    city: v.string(),
    country: v.string(),
    bio: v.string(),
    categories: v.array(v.id("categories")),
    urls: v.array(v.object({ value : v.string() })),
  },
  handler: async (ctx, { bio, gender, city, country, categories : newCategories, urls }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called becomeProfessional without authentication present");
    }
    if(!identity.email) {
      throw new Error("email is undefined in identity object");
    }

    const user = await getUserHelper(ctx, identity.email);
    if (user === null) {
      throw new Error("User not found");
    }

    // Add the categories to the user
    const userCategories = await ctx.db.query("userCategories").withIndex("userId", q => q.eq("userId", user._id)).collect();
    if (userCategories.length === 0) {
      // create new userCategories
      for (const cat of newCategories) {
        await ctx.db.insert("userCategories", {
          userId: user._id,
          categoryId: cat,
        });
      }
    } else {
      // delete the old userCategories
      for(const cat of userCategories) {
        await ctx.db.delete(cat?._id);
      }
      // create new userCategories
      for (const cat of newCategories) {
        await ctx.db.insert("userCategories", {
          userId: user._id,
          categoryId: cat,
        });
      }
    }

    await ctx.db.patch(user._id, {
      expert: true,
      verified: false,
      bio: bio,
      gender: gender,
      city: city,
      country: country,
      linkedIn: urls[0].value ?? "",
      instagram: urls[1].value ?? "",
      twitter: urls[2].value ?? "",
      portfolio: urls[3].value ?? "",
    });

    return ctx.db.get(user._id);
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

export const getProfessionals = query({
  args: {},
  handler: async ctx => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("expert"), true))
      .collect();
  },
});
