import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";

import { api } from "../../convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";



export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();

  const { user } = useUser();
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [userFullname, setUserFullname] = useState<string | null>(null);
  const [stripeId, setStripeId] = useState<string | null>(null);

  const storeUser = useMutation(api.users.createUser);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const { userId, fullName, stripeId } = await storeUser();
      setUserId(userId);
      setUserFullname(fullName);
      setStripeId(stripeId);
    }

    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, storeUser, user?.id]);

  return { userId, userFullname, stripeId };
}
