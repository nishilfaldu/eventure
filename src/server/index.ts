import { postRouter } from "./post";
import { router } from "./trpc";
import { userRouter } from "./user";



export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
