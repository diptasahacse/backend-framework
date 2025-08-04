import { Router } from "express";
import { createUserController, getUserController } from "./user.controller";

const router = Router();
router.get("/list", getUserController);
router.post("/create", createUserController);

export const userRouter = router;
