// import { create } from "zustand";

// import type { Id } from "convex/_generated/dataModel";



// interface UserState {
//   stripeId: string;
//   userId: Id<"users">;
//   userFullname: string;
//   setStripeId: (stripeId: string) => void;
//   setUserId: (userId: Id<"users">) => void;
//   setUserFullname: (userFullname: string) => void;
// }

// export const useUserStore = create<UserState>()(set => ({
//   stripeId: "",
//   userId: "" as Id<"users">,
//   userFullname: "",
//   setStripeId: stripeId => set(() => ({ stripeId: stripeId })),
//   setUserId: userId => set(() => ({ userId: userId })),
//   setUserFullname: userFullname => set(() => ({ userFullname: userFullname })),
// }));
