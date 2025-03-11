import { Router } from "express";
import * as controller from "../controllers/user";
import * as validator from "../validators/user";

const userRouter: Router = Router();

userRouter.post(
	"/register",
	validator.registerUser,
	controller.registerUser
);

export default userRouter;