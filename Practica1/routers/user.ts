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

// Hecho
userRouter.post(
	"/recoverPassword",
	validator.recoverPassword,
	controller.recoverPassword
);

// Hecho
userRouter.patch(
	"/setNewPassword",
	validator.setNewPassword,
	controller.setNewPassword
);

// Hecho!
userRouter.patch(
	"/validateEmail",
	auth,
	validator.validateEmail,
	controller.validateEmail
);

// Hecho!
userRouter.patch(
	"/editUserProfile",
	auth,
	validator.editUserProfile,
	controller.editUserProfile
);

// Hecho!
userRouter.patch(
	"/editUserCompany",
	auth,
	validator.editUserCompany,
	controller.editUserCompany
);

// Hecho!
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