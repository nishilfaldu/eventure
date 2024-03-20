"use client";
import useStoreStripeCustomerEffect from "@/lib/stripe";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useUserStore } from "@/zustand/hooks";



export function Composer({ children } : {children: React.ReactNode}) {
  const userId_ = useStoreUserEffect();
  const stripeId_ = useStoreStripeCustomerEffect();

  const userId = useUserStore(state => state.userId);
  const setUserId = useUserStore(state => state.setUserId);
  const stripeId = useUserStore(state => state.stripeId);
  const setStripeId = useUserStore(state => state.setStripeId);
  setUserId(userId_!);
  setStripeId(stripeId_!);
  console.log(userId, stripeId, "user and stripe id");

  return (
    <div>
      <div>
        <div className="flex items-center justify-center text-6xl font-bold my-16">
          <h1 className="text-center">Browse Event Professionals</h1>
        </div>
        <div>
          {userId ? children : "Storing or updating user..."}
        </div>
      </div>
    </div>
  );
}
