import { Router } from "express";
import * as controller from "../controllers/user";
import * as validator from "../validators/user";

const userRouter: Router = Router();

userRouter.post(
	"/register",
	validator.registerUser,
	controller.registerUser
);

userRouter.post(
	"/login",
	validator.loginUser,
	controller.loginUser
);

userRouter.post(
	"/recoverPassword",
	validator.recoverPassword,
	controller.recoverPassword
);

userRouter.patch(
	"/validateEmail",
	validator.validateEmail,
	controller.validateEmail
);

userRouter.patch(
	"/editUserCompany",
	validator.editUserCompany,
	controller.editUserCompany
);

userRouter.patch(
	"/editUserLogo",
	validator.editUserLogo,
	controller.editUserLogo
);

userRouter.get(
	"/getUserData",
	validator.getUserData,
	controller.getUserData
);

userRouter.delete(
	"/deleteUser",
	validator.deleteUser,
	controller.deleteUser
);

export default userRouter;