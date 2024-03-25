import { v } from "convex/values";
import { getManyFrom } from "convex-helpers/server/relationships";

import { mutation, query } from "./_generated/server";



export const getReviewsByUserId = query({
  args: {
    revieweeId: v.id("users"),
  },
  handler: async (ctx, { revieweeId }) => {
    const reviews = await getManyFrom(ctx.db, "reviews", "revieweeId", revieweeId);

    const reviewsWithUserInfoPromises = reviews.map(async review => {
      // Add user info to each review
      const reviewerUser = await ctx.db.get(review.reviewerId);
      if (!reviewerUser) { throw new Error("User not found"); }

      return { ...review, reviewerUser };
    });

    // Wait for all promises to resolve
    const reviewsWithUserInfo = await Promise.all(reviewsWithUserInfoPromises);
    // sort
    reviewsWithUserInfo.sort((a, b) => {
      return b._creationTime - a._creationTime;
    });

    const averageRating = reviewsWithUserInfo.reduce(
      (acc, review) => acc + review.ratingValue, 0) / reviewsWithUserInfo.length;

    const numReviews = reviewsWithUserInfo.length;

    return { reviewsWithUserInfo, averageRating, numReviews }; ;
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
