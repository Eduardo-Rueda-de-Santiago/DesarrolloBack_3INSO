import { Router } from "express";
import * as controller from "../controllers/user";
import * as validator from "../validators/user";
import auth from "../middleware/auth";


/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for the users of the database.
 */
const userRouter: Router = Router();

// Hecho!
userRouter.post(
	"/register",
	validator.registerUser,
	controller.registerUser
);

// Hecho!
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

// Hecho!
userRouter.patch(
	"/validateEmail",
	auth,
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

// Hecho!
userRouter.get(
	"/getUserData",
	auth,
	validator.getUserData,
	controller.getUserData
);

// Hecho!
userRouter.delete(
	"/deleteUser",
	auth,
	validator.deleteUser,
	controller.deleteUser
);

export default userRouter;