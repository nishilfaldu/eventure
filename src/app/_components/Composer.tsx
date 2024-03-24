"use client";
import { useEffect } from "react";

import { SubscribeDialog } from "./Stripe/SubscribeDialog";
import useStoreUserEffect from "@/lib/useStoreUserEffect";
import { useUserStore } from "@/zustand/hooks";



export function Composer({ children } : {children: React.ReactNode}) {
  const { userId, userFullname } = useStoreUserEffect();
  const userId_ = useUserStore(state => state.userId);
  //   const userFullname_ = useUserStore(state => state.userFullname);
  const setUserId = useUserStore(state => state.setUserId);
  const setUserFullname = useUserStore(state => state.setUserFullname);

  useEffect(() => {
    if (!userId || !userFullname) { return; }
    console.log(userId);
    setUserId(userId);
    setUserFullname(userFullname);
  }, [userId, setUserId, userFullname, setUserFullname]);

  return (
    <div>
      <div className="flex items-center justify-center text-6xl font-bold my-16">
        <h1 className="text-center">Browse Event Professionals</h1>
      </div>
      <div>
        {userId_ ? children : "Storing or updating user..."}
        <SubscribeDialog />
      </div>
    </div>
  );
}
