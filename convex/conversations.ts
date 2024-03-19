import { v } from "convex/values";
import { getManyFrom, getManyVia } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";
import { getUserHelper } from "./users";



export const getConversations = query({
  args: {
    // username: v.string(),
  },
  handler: async (ctx, {  }) => {
    const currentUser = await ctx.auth.getUserIdentity();
    console.log(currentUser, "currentUser");
    if (!currentUser) {
      throw new Error("User not found");
    }
    if(!currentUser.email) {
      throw new Error("User email not found");
    }

    const user = await getUserHelper(ctx, currentUser.email);

    if (!user) {
      throw new Error("User not found");
    }

    const conversations = await getManyVia(ctx.db, "userConversations", "conversationId", "userId", user._id, "userId");

    const conversationsWithMessagesAndUserIds = await Promise.all(conversations.map(async conversation => {
      if(!conversation) {
        throw new Error("conversation is null");
      }
      const messages = await getManyFrom(ctx.db, "messages", "conversationId", conversation._id);
      const users = await getManyVia(ctx.db, "userConversations", "userId", "conversationId", conversation._id, "conversationId");
      // remove current logged in user
      const filteredUsers = users.filter(user_ => user_?._id !== user._id);

      return {
        conversation,
        messages,
        filteredUsers,
      };
    }));

    // sort by last message - desc
    conversationsWithMessagesAndUserIds.sort((a, b) => {
      // Parse the lastMessageAt strings to dates
      const dateA = new Date(a.conversation.lastMessageAt);
      const dateB = new Date(b.conversation.lastMessageAt);

      // Compare the dates
      return dateB.getTime() - dateA.getTime();
    });

    return conversationsWithMessagesAndUserIds;
  },
});

export const getConversationById = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const conversation = await ctx.db.get(conversationId);

    return conversation;
  },
});

export const getOrCreateConversation = mutation({
  args: {
    otherUserId: v.id("users"),
  },
  handler: async (ctx, { otherUserId }) => {
    const currentUser = await ctx.auth.getUserIdentity();
    if (!currentUser) {
      throw new Error("User not found");
    }
    if(!currentUser.email) {
      throw new Error("User email not found");
    }

    const currentUserDetails = await getUserHelper(ctx, currentUser.email);
    if (!currentUserDetails) {
      throw new Error("Current user details not found");
    }
    const conversationsOfCurrentUser = await ctx.db.query("userConversations")
      .withIndex("userId", q => q.eq("userId", currentUserDetails._id))
      .collect();

    const conversationsOfOtherUser = await ctx.db.query("userConversations")
      .withIndex("userId", q => q.eq("userId", otherUserId))
      .collect();

    const conversation = conversationsOfCurrentUser.find(conversation => {
      return conversationsOfOtherUser.some(otherConversation => {
        return conversation.conversationId === otherConversation.conversationId;
      });
    });

    if(!conversation || !conversation._id) {
      // create a new conversation and add both
      const newConversationId = await ctx.db.insert("conversations", {
        lastMessageAt: new Date().toISOString(),
      });

      await ctx.db.insert("userConversations", {
        userId: currentUserDetails._id,
        conversationId: newConversationId,
      });

      await ctx.db.insert("userConversations", {
        userId: otherUserId,
        conversationId: newConversationId,
      });

      return newConversationId;
    }

    return conversation.conversationId;
  },
});
