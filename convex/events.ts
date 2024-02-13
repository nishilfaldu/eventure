import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";



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

export const deleteEvent = mutation({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, { eventId }) => {
    return ctx.db.delete(eventId);
  },
});

export const getEventsByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const events = await getManyFrom(ctx.db, "events", "userId", userId);

    return events;
  },
});
