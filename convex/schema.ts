import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  users: defineTable({
    username: v.string(),
    name: v.string(),
    email: v.string(),
    // gender: v.string(),
    // dob: v.string(),
    // country: v.string(),
    // phoneNumber: v.string(),
    // city: v.string(),
    // zipCode: v.string(),
  }).index("byUsername", ["username"]),

  experts: defineTable({
    userId: v.id("users"),
    firstName: v.string(),
    lastName: v.string(),
    gender: v.union(v.literal("Male"), v.literal("Female"), v.literal("Other")),
    dob: v.string(),
    country: v.string(),
    phoneNumber: v.string(),
    city: v.string(),
    zipCode: v.string(),
    tagLine: v.string(),
    bio: v.string(),
    question1: v.string(),
    question2: v.string(),
    question3: v.optional(v.string()),
    question4: v.optional(v.string()),
    question5: v.optional(v.string()),
    textAnswerPrice: v.int64(),
    videoAnswerPrice: v.int64(),
    videoCallPrice: v.int64(),
    portfolio: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    pictureUrl: v.string(),
    verified: v.boolean(),
  }).index("byFirstName", ["firstName"]),

  categories: defineTable({
    name: v.string(),
    description: v.string(),
  }).index("byName", ["name"]),

  expertCategories: defineTable({
    expertId: v.id("experts"),
    categoryId: v.id("categories"),
  }).index("byExpertId", ["expertId"]),

  events: defineTable({
    type: v.union(v.literal("Birthday"), v.literal("Wedding")),
    date: v.string(),
    location: v.string(),
    name: v.string(),
    userId: v.id("users"),
    decorationId: v.optional(v.id("decoration")),
    cleanupId: v.optional(v.id("cleanup")),
    foodId: v.optional(v.id("food")),
    essentialId: v.optional(v.id("essential")),
    favorId: v.optional(v.id("favor")),
    entertainmentId: v.optional(v.id("entertainment")),
  }).index("byEventName", ["name"]),

  notes: defineTable({
    eventId: v.id("events"),
    note: v.string(),
  }).index("byEventId", ["eventId"]),

  messages: defineTable({
    senderId: v.union(v.id("experts"), v.id("users")),
    receiverId: v.union(v.id("experts"), v.id("users")),
    content: v.string(),
  }).index("bySenderAndReceiverId", ["senderId", "receiverId"]),

  reviews: defineTable({
    userId: v.id("users"),
    expertId: v.id("experts"),
    review: v.string(),
    ratingValue: v.int64(),
  }).index("byUserAndExpertId", ["expertId", "userId"]),

  transactions: defineTable({
    paymentIntentId: v.string(),
    userId: v.id("users"),
    amount: v.int64(),
    status: v.union(v.literal("Successful"), v.literal("Failed"), v.literal("Pending")),
    paymentMethod: v.string(),
    description: v.string(),
    stripeChargeId: v.string(),
    metadata: v.string(),
  }),

  guests: defineTable({
    name: v.string(),
    email: v.string(),
    phoneNumber: v.string(),
    eventId: v.id("events"),
    registered: v.boolean(),
  }).index("byEventId", ["eventId"]),
});
