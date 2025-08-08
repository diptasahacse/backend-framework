import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const router = Router();

const userController = new UserController(new UserService());

router.get("/list", userController.findAll);
router.post("/create", userController.create);

export const userRouter = router;
