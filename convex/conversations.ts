import { v } from "convex/values";
import { getManyVia } from "convex-helpers/server/relationships";

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

    return conversations;
  },
});


