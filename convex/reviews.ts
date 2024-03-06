import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";



export const getReviewsByUserId = query({
  args: {
    revieweeId: v.id("users"),
  },
  handler: async (ctx, { revieweeId }) => {
    const reviews = await getManyFrom(ctx.db, "reviews", "revieweeId", revieweeId);

    return reviews;
  },
});

export const createReviewByUserId = mutation({
  args: {
    revieweeId: v.id("users"),
    reviewerId: v.id("users"),
    ratingValue: v.number(),
    description: v.string(),
  },
  handler: async (ctx, { revieweeId, reviewerId, ratingValue, description }) => {
    const newReview = await ctx.db.insert("reviews", {
      revieweeId,
      reviewerId,
      ratingValue,
      description,
    });

    return newReview;
  },
});
