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
  }, [storeStripeCustomerId, isAuthenticated]);

  return stripeCustomerId;
}


export function useHasSubscription(stripeCustomerId: string | undefined) {
  const { isAuthenticated } = useConvexAuth();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!isAuthenticated || !stripeCustomerId) {
      return;
    }

    async function checkSubscription() {
      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
      });

      setHasSubscription(subscriptions.data.length > 0);
      setLoading(false);
    }

    checkSubscription();

    return () => {
      // Cleanup if necessary
    };
  }, [isAuthenticated, stripeCustomerId]);

  return { hasSubscription, loading };
}

export function useCreateCheckoutLink(customer: string) {
  const { isAuthenticated } = useConvexAuth();
  const [checkoutLink, setCheckoutLink] = useState<string | null>(null);

  useEffect(() => {
    async function createLink() {
      if(!customer) { return; }
      if (isAuthenticated) {
        const checkout = await stripe.checkout.sessions.create({
          success_url: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000/",
          cancel_url: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000/",
          customer: customer,
          line_items: [
            {
              price: "price_1OwFzZIv5IqZqEz6BZoWShXj",
              quantity: 1,
            },
          ],
          mode: "subscription",
        });

        setCheckoutLink(checkout.url);
      } else {
        setCheckoutLink(null);
      }
    }

    createLink();

    return () => {
      // Cleanup if necessary
    };
  }, [isAuthenticated, customer]);

  return checkoutLink;
}
