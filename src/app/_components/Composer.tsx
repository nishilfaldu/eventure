"use client";
import { useEffect } from "react";

import { useUserStore } from "./UserStoreProvider";
import { usePersistedState } from "@/lib/usePersistedStorage";
import useStoreUserEffect from "@/lib/useStoreUserEffect";



export function Composer({ children } : {children: React.ReactNode}) {
  const { userId, userFullname, stripeId } = useStoreUserEffect();
  const userId_ = useUserStore(state => state.userId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPersistedState, setUserPersistedState] = usePersistedState("userDetails", undefined);
  const { setUserFullname, setUserId, setStripeId } = useUserStore(
    state => state,
  );

  useEffect(() => {
    if (!userId || !userFullname) { return; }
    setUserId(userId);
    setUserPersistedState({
      userId: userId,
      userFullname: userFullname,
    });
    setUserFullname(userFullname);
    if(!stripeId) { return; }
    setStripeId(stripeId);
  }, [userId, setUserId, userFullname, setUserFullname, stripeId,
    setStripeId, setUserPersistedState]);

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
