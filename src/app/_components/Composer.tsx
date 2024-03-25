"use client";
import { useEffect } from "react";

import { SubscribeDialog } from "./Stripe/SubscribeDialog";
import { useUserStore } from "./UserStoreProvider";
import useStoreUserEffect from "@/lib/useStoreUserEffect";



export function Composer({ children } : {children: React.ReactNode}) {
  const { userId, userFullname } = useStoreUserEffect();
  const userId_ = useUserStore(state => state.userId);
  //   const userFullname_ = useUserStore(state => state.userFullname);
  //   const setUserId = useUserStore(state => state.setUserId);
  //   const setUserFullname = useUserStore(state => state.setUserFullname);

  const { setUserFullname, setUserId } = useUserStore(
    state => state,
  );

  useEffect(() => {
    if (!userId || !userFullname) { return; }
    console.log(userId);
    setUserId(userId);
    setUserFullname(userFullname);
  }, [userId, setUserId, userFullname, setUserFullname]);

  return (
    <div>
      <div className="flex items-center justify-center text-5xl font-medium my-16">
        <h1 className="text-center">Find an Expert</h1>
      </div>
      <div>
        {userId_ ? children : "Storing or updating user..."}
        <SubscribeDialog />
      </div>
    </div>
  );
}
