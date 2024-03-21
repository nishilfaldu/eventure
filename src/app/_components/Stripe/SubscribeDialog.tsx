import { useAction, useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateCheckoutLink, useHasSubscription } from "@/lib/stripe";



export function SubscribeDialog() {
  //   TODO: fix setting of stripeId in zustand state
  const storeStripeCustomerId = useAction(api.stripe.storeStripeCustomerId);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const user = useQuery(api.users.getCurrentUser);

  const checkoutLink = useCreateCheckoutLink(stripeCustomerId!);
  const hasSub = useHasSubscription(user?.stripeId);

  const handleStripeSubmission = async () => {
    const id = await storeStripeCustomerId();
    setStripeCustomerId(id);
  };

  return (
    <Dialog open={!hasSub}>
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
            <Button size="lg" variant="default" onClick={handleStripeSubmission}>Become a customer</Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
