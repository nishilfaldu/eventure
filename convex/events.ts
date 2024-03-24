import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";
import { getUserHelper } from "./users";



export const createEvent = mutation({
  args: {
    name: v.string(),
    type: v.string(),
    date: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { date, name, type, userId }) => {
    return ctx.db
      .insert("events", {
        date: date,
        name: name,
        type: type,
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
    // TODO: add back in when auth is working

    // const identity = await ctx.auth.getUserIdentity();
    // console.log(identity, "identity");
    // if (!identity) {
    //   throw new Error("Called getEventsByUserId without authentication present");
    // }
    // if(!identity.email) {
    //   throw new Error("email is undefined in identity object");
    // }

    // const user = await getUserHelper(ctx, identity.email);
    // if (user === null) {
    //   throw new Error("User not found");
    // }

    const events = await getManyFrom(ctx.db, "events", "userId", userId);

    return events;
  },
});
