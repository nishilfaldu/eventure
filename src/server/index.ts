import { eventRouter } from "./event";
import { guestRouter } from "./guest";
import { router } from "./trpc";
import { userRouter } from "./user";



export const appRouter = router({
  user: userRouter,
  guest: guestRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
