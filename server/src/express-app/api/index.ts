import { Router } from "express";

import { userRouter } from "./user";



const apiRouter = Router();

apiRouter.use("/", userRouter);

export { apiRouter };
