import { create } from "zustand";

import type { Id } from "convex/_generated/dataModel";



interface UserState {
  stripeId: string;
  userId: Id<"users">;
  setStripeId: (stripeId: string) => void;
  setUserId: (userId: Id<"users">) => void;
}

export const useUserStore = create<UserState>()(set => ({
  stripeId: "",
  userId: "" as Id<"users">,
  setStripeId: stripeId => set(() => ({ stripeId: stripeId })),
  setUserId: userId => set(() => ({ userId: userId })),
}));
