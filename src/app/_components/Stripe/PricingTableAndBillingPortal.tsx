import React, { useEffect } from "react";

import { stripe } from "@/lib/stripe";


// Generate Customer portal
export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url:  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
    });

    return portalSession.url;
  } catch (error) {
    // TODO: throw an error
    console.log(error);

    return undefined;
  }
}

//Component for your page
export const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID!,
    "publishable-key": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  });
};
