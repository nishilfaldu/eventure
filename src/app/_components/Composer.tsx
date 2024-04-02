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
      {/* <div className="flex items-left justify-left text-5xl font-medium my-16">
        <h1 className="text-left">Find an Expert</h1>
      </div> */}
      <br/><br/>
      <div className="text-black text-5xl font-medium break-words pt-6">Find an Expert</div>
      <div className="flex justify-between items-center">
        <div className="relative text-gray-600 text-2xl font-medium break-words">
          Explore an array of experts with Eventure. Browse from our categories to find your perfect match!
        </div>
      </div>
      <br/>
      <div>
        {userId_ ? children : "Storing or updating user..."}
        {/* <SubscribeDialog /> */}
      </div>
    </div>
  );
}
