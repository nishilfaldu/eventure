"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { generateCustomerPortalLink } from "./PricingTableAndBillingPortal";
import { api } from "../../../../convex/_generated/api";
import { LoadingSpinner } from "../LoadingSpinner";
import { checkHasSubscription, generateCheckoutLink } from "@/lib/stripe";



export function SubscriptionDetails() {
  const user = useQuery(api.users.getCurrentUser);
  const [manageBillingLink, setManageBillingLink] = useState<string | null>(null);
  const [checkoutLink, setCheckoutLink] = useState<string | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean | undefined>(undefined);


  useEffect(() => {
    async function getBillingLink() {
      if(!user || !user.stripeId) { return; }
      const billingLink = await generateCustomerPortalLink(user.stripeId);
      if(billingLink) { setManageBillingLink(billingLink); }
      const checkoutLink = await generateCheckoutLink(user.stripeId);
      if(checkoutLink) { setCheckoutLink(checkoutLink); }
      const hasSubscription = await checkHasSubscription(user.stripeId);
      if(hasSubscription !== undefined) {
        setHasSubscription(hasSubscription);
      }
    }

    getBillingLink();
  }, [user?.stripeId, user]);

  return(
    <div className="p-4">
      {hasSubscription ? <div className="p-6 rounded-md flex items-center border-emerald-400 border shadow-sm font-medium">
        Subscribed
        {manageBillingLink ? <Link className="bg-black ml-auto text-white rounded-md px-2 py-1"
          href={manageBillingLink}>Mange Billing</Link> : <LoadingSpinner className="ml-auto"/>}
      </div>
        : <div className="p-6 rounded-md border-zinc-400 border shadow-sm font-medium flex items-center gap-2">
            Free Plan
          {checkoutLink ? <Link className="bg-black ml-auto text-white rounded-md px-2 py-1"
            href={checkoutLink} >Upgrade</Link> : <LoadingSpinner className="ml-auto"/>}
        </div>}
    </div>
  );
}
