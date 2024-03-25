import { createStore } from "zustand/vanilla";

import type { Id } from "convex/_generated/dataModel";



export type UserState = {
  stripeId: string;
  userId: Id<"users">;
  userFullname: string;
}

export type UserActions = {
  setStripeId: (stripeId: string) => void;
  setUserId: (userId: Id<"users">) => void;
  setUserFullname: (userFullname: string) => void;
}

export type UserStore = UserState & UserActions

export const initUserStore = (): UserState => {
  return defaultInitState;
};

export const defaultInitState: UserState = {
  stripeId: "",
  userId: "" as Id<"users">,
  userFullname: "",
};

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()(set => ({
    ...initState,
    setStripeId: stripeId => set(() => ({ stripeId: stripeId })),
    setUserId: userId => set(() => ({ userId: userId })),
    setUserFullname: userFullname => set(() => ({ userFullname: userFullname })),
  }));
};
