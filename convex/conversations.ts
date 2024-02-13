import { v } from "convex/values";
import { getManyFrom, getManyVia } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";
import { getUserHelper } from "./users";



export const getConversations = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, { username }) => {
    const user = await getUserHelper(ctx, username);
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

      return {
        conversation,
        messages,
        users,
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

