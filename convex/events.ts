import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";
import dayjs from "dayjs";

import { mutation, query } from "./_generated/server";



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
    timeline: v.union(v.literal("past"), v.literal("upcoming")),
  },
  handler: async (ctx, { userId, timeline }) => {
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
    if(events.length === 0) {
      return events;
    }

    // depending on the timeline filter out the events
    const currentDate = new Date();

    if (timeline === "past") {
      return events.filter(event => {
        const dateArray = event.date.split("/");
        const eventDate = new Date(parseInt(dateArray[2]),parseInt(dateArray[0])-1, parseInt(dateArray[1]));

        return eventDate < currentDate;
      }
      );
    } else if (timeline === "upcoming") {
      return events.filter(event => {
        const dateArray = event.date.split("/");
        const eventDate = new Date(parseInt(dateArray[2]),parseInt(dateArray[0])-1, parseInt(dateArray[1]));

        return eventDate > currentDate;
      });
    } else {
      return []; // Handle invalid timeline
    }
  },
});
