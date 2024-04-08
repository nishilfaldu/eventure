"use client";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { generateCheckoutLink } from "@/lib/stripe";



export function SubscribeDialog({ hasSubscription } : {hasSubscription: boolean}) {
  const user = useQuery(api.users.getCurrentUser);
  const [checkoutLink, setCheckoutLink] = useState<string | null>(null);

  useEffect(() => {
    const handleStripeSubmission = async () => {
      const checkoutLink = await generateCheckoutLink(user?.stripeId);
      if(checkoutLink) { setCheckoutLink(checkoutLink); }
    };

    handleStripeSubmission();
  }, [user?.stripeId]);


  return (
    <Dialog open={!hasSubscription}>
      <DialogTrigger asChild>
        {/* <span className="flex md:px-20 my-8">
          <Button size="lg" variant="outline" className="bg-white text-black hover:bg-black hover:text-white border-neutral-800 font-bold">Show all reviews</Button>
        </span> */}
      </DialogTrigger>
      <DialogContent className="max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Have you subscribed to a plan yet?</DialogTitle>
          <DialogDescription>
             You will have to subscribe to get access to the full features of the app.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {user?.stripeId ?
            <Button size="lg" variant="default">
              <Link href={checkoutLink ?? ""}>Checkout</Link>
            </Button> :
            <Button size="lg" variant="default"><Link href="/settings/pricing">Go to Billing</Link></Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
