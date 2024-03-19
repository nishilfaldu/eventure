import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";



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
