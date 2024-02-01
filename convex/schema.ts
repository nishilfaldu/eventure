import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  users: defineTable({
    externalId: v.string(),
    role: v.union(v.literal("USER"), v.literal("ADMIN")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    country: v.string(),
    address: v.string(),
    apartment: v.string(),
    city: v.string(),
    zipCode: v.string(),
    state: v.string(),
  }).index("byExternalId", ["externalId"]),

  cleanup: defineTable({
    id: v.id("cleanup"),
    trashBags: v.boolean(),
    supplies: v.boolean(),
    recycle: v.boolean(),
    containers: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  decoration: defineTable({
    id: v.id("decoration"),
    balloons: v.boolean(),
    posters: v.boolean(),
    tableDecorations: v.boolean(),
    wallDecorations: v.boolean(),
    lights: v.boolean(),
    personalizedTouches: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  events: defineTable({
    id: v.id("events"),
    type: v.string(),
    date: v.string(),
    location: v.string(),
    name: v.string(),
    userId: v.id("users"),
    decorationId: v.id("decoration"),
    cleanupId: v.id("cleanup"),
    foodId: v.id("food"),
    essentialId: v.id("essential"),
    favorId: v.id("favor"),
    entertainment: v.id("entertainment"),
  }).index("byId", ["id"]),

  food: defineTable({
    id: v.id("food"),
    appetizers: v.boolean(),
    mainCourse: v.boolean(),
    dessert: v.boolean(),
    drinks: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  essential: defineTable({
    id: v.id("essential"),
    cupsAndStraws: v.boolean(),
    utensils: v.boolean(),
    accessories: v.boolean(),
    candles: v.boolean(),
    cakeToppers: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  favor: defineTable({
    id: v.id("favor"),
    goodyBags: v.boolean(),
    thankYouNote: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  entertainment: defineTable({
    id: v.id("entertainment"),
    music: v.boolean(),
    entertainers: v.boolean(),
    activities: v.boolean(),
    photobooth: v.boolean(),
    prizes: v.boolean(),
    eventId: v.id("events"),
  }).index("byId", ["id"]),

  guests: defineTable({
    id: v.id("guests"),
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    eventId: v.id("events"),
    registered: v.boolean(),
  }).index("byId", ["id"]),
});
