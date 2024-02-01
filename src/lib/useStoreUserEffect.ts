import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";

import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";



export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();

  const { user } = useUser();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  const storeUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }

    createUser();

    return () => setUserId(null);
  }, [isAuthenticated, storeUser, user?.id]);

  return userId;
}
