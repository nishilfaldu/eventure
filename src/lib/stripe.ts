import { useAction, useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import { api } from "../../convex/_generated/api";




export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY! ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);


export default function useStoreStripeCustomerEffect() {
  const { isAuthenticated } = useConvexAuth();
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);

  const storeStripeCustomerId = useAction(api.stripe.storeStripeCustomerId);

  useEffect(() => {
    if (!isAuthenticated) { return; }

    async function createStoreStripeCustomer() {
      const id = await storeStripeCustomerId();
      setStripeCustomerId(id);
    }

    createStoreStripeCustomer();

    return () => setStripeCustomerId(null);
  }, [isAuthenticated, storeStripeCustomerId]);

  return stripeCustomerId;
}


export function useHasSubscription(stripeCustomerId: string) {
  const { isAuthenticated } = useConvexAuth();
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    if(!isAuthenticated) {
      return;
    }

    async function checkSubscription() {
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
      });

      setHasSubscription(subscriptions.data.length > 0);
    }

    checkSubscription();

    return () => {
      // Cleanup if necessary
    };
  }, [isAuthenticated, stripeCustomerId]);

  return hasSubscription;
}
