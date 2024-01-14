import { router, publicProcedure } from "./trpc";



export const postRouter = router({
  list: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
});
