// This pragma is important because Stripe's SDK currently
// only works in the Node Runtime
"use node";

import Stripe from "stripe";

import { internal } from "./_generated/api";
import { action } from "./_generated/server";



// TODO: this might have to change if user changes email address through clerk
// so revoke permission from clerk to change email or update this logic
export const storeStripeCustomerId = action({
  args: {},
  handler: async (ctx) : Promise<string | null> => {
    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY! ?? "",
      {
        apiVersion: "2023-10-16",
        typescript: true,
      }
    );

    const user = await ctx.runQuery(internal.users.getUserInternalQuery);
    if (!user) {
      throw new Error("User not found");
    }

    if(!user.stripeId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.firstName + " " + user.lastName,
      });

      const stripeId : string | null
       = await ctx.runMutation(internal.users.storeStripeId, { userId: user._id, stripeId: customer.id });

      return stripeId;
    }

    const userStripeId: string = user.stripeId;

    return userStripeId;
  },
});
