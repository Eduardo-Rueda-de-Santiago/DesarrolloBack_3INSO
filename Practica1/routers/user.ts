import { Router } from "express";
import * as controller from "../controllers/user";

const userRouter: Router = Router();

userRouter.post(
	"/register",
	controller.registerUser
);

export default userRouter;