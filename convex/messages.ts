import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";
import { getUserHelper } from "./users";



export const getMessagesByConversationId = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const messages = await getManyFrom(ctx.db, "messages", "conversationId", conversationId);

    // add user information to each message
    const messagesWithUserInfoPromises = messages.map(async message => {
      const senderUser = await ctx.db.get(message.senderId);
      if (!senderUser) { throw new Error("User not found"); }

      return { ...message, senderUser };
    });

    // Wait for all promises to resolve
    const messagesWithUserInfo = await Promise.all(messagesWithUserInfoPromises);

    // sort by last message - asc
    messagesWithUserInfo.sort((a, b) => {
      // Parse the lastMessageAt strings to dates
      const dateA = new Date(a._creationTime);
      const dateB = new Date(b._creationTime);

      // Compare the dates
      return dateA.getTime() - dateB.getTime();
    });


    return messagesWithUserInfo;
  },
});

export const createMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    body: v.string(),
  },
  handler: async (ctx, { conversationId, body }) => {
    const currentUser = await ctx.auth.getUserIdentity();
    if (!currentUser) {
      throw new Error("User not found");
    }
    if(!currentUser.email) {
      throw new Error("User email not found");
    }
    const user = await getUserHelper(ctx, currentUser.email);
    if (!user) {
      throw new Error("User not found from helper");
    }

    const message = await ctx.db.insert("messages", {
      conversationId,
      senderId: user._id,
      body,
    });

    return message;
  },
});

// TODO: try-catch must be used on frontend for error messages
