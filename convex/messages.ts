import { v } from "convex/values";

import { query } from "./_generated/server";



export const getMessages = query({
  args: {
    conversationId: v.string(),
  },
  handler: async (ctx, { conversationId }) => {
    return await ctx.db
      .query("messages")
      .filter(q => q.eq("conversationId", conversationId))
      .order("asc")
      .collect();
  },
});
