import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";



export const getGuestsByEventId = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, { eventId }) => {
    const guests = await getManyFrom(ctx.db, "guests", "eventId", eventId);

    return guests;
  },
});

export const createGuest = mutation({
  args: {
    eventId: v.id("events"),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
  },
  handler: async (ctx, { eventId, name, email, phoneNumber }) => {
    return ctx.db.insert("guests", {
      eventId: eventId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      registered: false,
    });
  },
});

export const deleteGuestById = mutation({
  args: {
    guestId: v.id("guests"),
  },
  handler: async (ctx, { guestId }) => {
    return ctx.db.delete(guestId);
  },
});

export const updateGuestById = mutation({
  args: {
    guestId: v.id("guests"),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    registered: v.boolean(),
  },
  handler: async (ctx, { guestId, name, email, phoneNumber, registered }) => {
    return ctx.db.patch(guestId, {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      registered: registered,
    });
  },
});

export const getGuestById = query({
  args: {
    guestId: v.id("guests"),
  },
  handler: async (ctx, { guestId }) => {
    return ctx.db.get(guestId);
  },
});
