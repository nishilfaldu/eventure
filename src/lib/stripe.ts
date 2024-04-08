import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import Stripe from "stripe";

import { toast } from "@/components/ui/use-toast";




export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY! ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);
export async function checkHasSubscription(customer: string | undefined) {
  if (!customer) { return; }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customer,
    });

    return (subscriptions.data.length > 0);
  } catch (error) {
    // TODO: throw an error
    toast({
      title: "Error",
      description: "There was an error while checking if the user has subscription",
    });
    console.log(error);

    return undefined;
  }
}

export function useHasSubscription(stripeCustomerId: string | undefined) {
  const { isAuthenticated } = useConvexAuth();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);

  useEffect(() => {
    if(!isAuthenticated || !stripeCustomerId) {
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

export async function generateCheckoutLink(customer: string | undefined) {
  if (!customer) { return; }

  try {
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

    return checkout.url;
  } catch (error) {
    // TODO: throw an error
    toast({
      title: "Error",
      description: "There was an error while generating the customer checkout link",
    });
    console.log(error);
  }
}


export function useCreateCheckoutLink(customer: string | undefined) {
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
