"use client";
import { StripePricingTable } from "@/app/_components/Stripe/PricingTableAndBillingPortal";
import { Separator } from "@/components/ui/separator";



export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pricing</h3>
        <p className="text-sm text-muted-foreground">
        Find a plan to power your event management
        </p>
      </div>
      <Separator />
      <StripePricingTable />
    </div>
  );
}
