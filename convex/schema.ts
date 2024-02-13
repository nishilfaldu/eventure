import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";



export default defineSchema({
  users: defineTable({
    // user related
    username: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phoneNumber: v.string(),

    // expert related
    expert: v.boolean(),
    verified: v.boolean(),

    gender: v.optional(v.union(v.literal("Male"), v.literal("Female"), v.literal("Other"))),
    dob: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    tagLine: v.optional(v.string()),
    bio: v.optional(v.string()),
    question1: v.optional(v.string()),
    question2: v.optional(v.string()),
    question3: v.optional(v.string()),
    question4: v.optional(v.string()),
    question5: v.optional(v.string()),
    portfolio: v.optional(v.string()),
    linkedIn: v.optional(v.string()),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
  }).index("byUsernameAndEmail", ["username", "email"]),

  //   many to many relationship
  userConversations: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
  }).index("userId", ["userId"])
    .index("conversationId", ["conversationId"]),

  categories: defineTable({
    name: v.string(),
    description: v.string(),
  }).index("byName", ["name"]),

  userCategories: defineTable({
    userId: v.id("users"),
    categoryId: v.id("categories"),
  }).index("userId", ["userId"])
    .index("categoryId", ["categoryId"]),

  events: defineTable({
    type: v.union(v.literal("Birthday"), v.literal("Wedding")),
    date: v.string(),
    location: v.string(),
    name: v.string(),
    userId: v.id("users"),
  }).index("userId", ["userId"]),

  tasks: defineTable({
    eventId: v.id("events"),
    description: v.string(),
    header: v.string(),
    done: v.boolean(),
  }).index("eventId", ["eventId"]),

  conversations: defineTable({
    lastMessageAt: v.string(),
  }).index("lastMessageAt", ["lastMessageAt"]),

  messages: defineTable({
    body: v.string(),
    image: v.string(),

    conversationId: v.id("conversations"),
    senderId: v.id("users"),
  }).index("conversationId", ["conversationId"]),

  reviews: defineTable({
    reviewerId: v.id("users"),
    revieweeId: v.id("users"),
    description: v.string(),
    ratingValue: v.number(),
  }).index("reviewerId", ["reviewerId"])
    .index("revieweeId", ["revieweeId"]),

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
  }).index("eventId", ["eventId"]),
});
