"use client";
import { AuthLoading, Authenticated } from "convex/react";

import { SubscriptionDetails } from "@/app/_components/Stripe/SubscriptionDetails";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";



export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
        Find a plan to power your event management
        </p>
      </div>
      <Separator />
      <Authenticated>
        <SubscriptionDetails/>
      </Authenticated>
      <AuthLoading>
        <Skeleton className="h-[100px] w-full rounded-xl" />
      </AuthLoading>
    </div>
  );
}
