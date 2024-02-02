import { v } from "convex/values";

import { mutation } from "./_generated/server";



export const createEvent = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    location: v.string(),
    date: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { date, location, name, type, userId }) => {
    return ctx.db
      .insert("events", {
        date: date,
        location: location,
        name: name,
        type: type as "Birthday" | "Wedding",
        userId: userId,
      });
  },
});
