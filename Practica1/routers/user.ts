import { Router } from "express";
import * as controller from "../controllers/user";
import * as validator from "../validators/user";
import auth from "../middleware/auth";

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
	auth,
	validator.editUserCompany,
	controller.editUserCompany
);

userRouter.patch(
	"/editUserLogo",
	auth,
	validator.editUserLogo,
	controller.editUserLogo
);

userRouter.get(
	"/getUserData",
	auth,
	validator.getUserData,
	controller.getUserData
);

userRouter.delete(
	"/deleteUser",
	auth,
	validator.deleteUser,
	controller.deleteUser
);

export default userRouter;