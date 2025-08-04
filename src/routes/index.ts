import { userRouter } from "@/modules/user/user.router";
import { Router } from "express";
const apiRouter = Router();
const moduleRoutes = [
  {
    path: "/users",
    routes: userRouter,
  },
];

moduleRoutes.forEach((item) => apiRouter.use(item.path, item.routes));

export default apiRouter;
