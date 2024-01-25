import { publicProcedure, router } from "./trpc";



export const userRouter = router({
  list: publicProcedure.query(() => {
    // [..]
    return [];
  }),

  hello: publicProcedure.query(({ ctx }) => {
    return {
      greeting: `hello! ${ctx.auth?.userId}`,
    };
  }),
});
