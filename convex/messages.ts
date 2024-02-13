import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";



export const getMessagesByConversationId = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const messages = await getManyFrom(ctx.db, "messages", "conversationId", conversationId);

    // sort by last message - asc
    messages.sort((a, b) => {
      // Parse the lastMessageAt strings to dates
      const dateA = new Date(a._creationTime);
      const dateB = new Date(b._creationTime);

      // Compare the dates
      return dateA.getTime() - dateB.getTime();
    });

    return messages;
  },
});
