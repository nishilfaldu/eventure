"use client";
import { useEffect } from "react";

import { useUserStore } from "./UserStoreProvider";
import useStoreUserEffect from "@/lib/useStoreUserEffect";



export function Composer({ children } : {children: React.ReactNode}) {
  const { userId, userFullname, stripeId } = useStoreUserEffect();
  const userId_ = useUserStore(state => state.userId);
  //   const userFullname_ = useUserStore(state => state.userFullname);
  //   const setUserId = useUserStore(state => state.setUserId);
  //   const setUserFullname = useUserStore(state => state.setUserFullname);

  const { setUserFullname, setUserId, setStripeId } = useUserStore(
    state => state,
  );

  useEffect(() => {
    if (!userId || !userFullname) { return; }
    setUserId(userId);
    setUserFullname(userFullname);
    if(!stripeId) { return; }
    setStripeId(stripeId);
  }, [userId, setUserId, userFullname, setUserFullname, stripeId, setStripeId]);

  return (
    <div>
      <div className="flex items-center justify-center text-5xl font-medium my-16">
        <h1 className="text-center">Find an Expert</h1>
      </div>
      <div>
        {userId_ ? children : "Storing or updating user..."}
        {/* <SubscribeDialog /> */}
      </div>
    </div>
  );
}
