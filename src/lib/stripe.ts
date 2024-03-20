import { useAction, useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import { api } from "../../convex/_generated/api";



console.log(process.env.STRIPE_SECRET_KEY!, "hello under water");

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
