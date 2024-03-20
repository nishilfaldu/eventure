"use client";
import useStoreStripeCustomerEffect from "@/lib/stripe";
import useStoreUserEffect from "@/lib/useStoreUserEffect";



export function Composer({ children } : {children: React.ReactNode}) {
  const userId = useStoreUserEffect();
  const stripeId = useStoreStripeCustomerEffect();

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
