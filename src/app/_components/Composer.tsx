"use client";
import { useEffect } from "react";

import { SubscribeDialog } from "./Stripe/SubscribeDialog";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useUserStore } from "@/zustand/hooks";



export function Composer({ children } : {children: React.ReactNode}) {
  const userId_ = useStoreUserEffect();
  const userId = useUserStore(state => state.userId);
  const setUserId = useUserStore(state => state.setUserId);

  useEffect(() => {
    if (!userId_) { return; }
    console.log(userId_);
    setUserId(userId_);
  }, [userId_, setUserId]);

  //   useEffect(() => {
  //     if (!stripeId_) { return; }
  //     console.log(stripeId_);
  //     setStripeId(stripeId_);
  //   }, [stripeId_, setStripeId]);

  // setUserId(userId_!);


  //   setStripeId(stripeId_!);
  //   console.log(stripeId, "stripeId", userId, "userId");

  //   const hasSubscription = useHasSubscription(stripeId!);

  //   const checkoutLink = useCreateCheckoutLink(stripeId);

  //   console.log(hasSubscription, "hasSubscription");

  return (
    <div>
      <div>
        <div className="flex items-center justify-center text-6xl font-bold my-16">
          <h1 className="text-center">Browse Event Professionals</h1>
        </div>
        <div>
          {userId ? children : "Storing or updating user..."}
          <SubscribeDialog />
        </div>
      </div>
    </div>
  );
}
