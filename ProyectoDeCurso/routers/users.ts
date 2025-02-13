import express from "express";

import controller from "../controllers/users";

/**
 * Crea un objeto router.
 */
const usersRouter = express.Router();

usersRouter.post("/", controller.createUser);
usersRouter.get("/", controller.getAllUsers);

// Exporta el router una vez definidos todos los endpoints.s
export { usersRouter };
