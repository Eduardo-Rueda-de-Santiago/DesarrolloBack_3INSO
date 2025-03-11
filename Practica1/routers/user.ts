import { Router } from "express";

const userRouter: Router = Router();

userRouter.post("/register", () => {
	console.log("Tried!!")
});

export default userRouter;