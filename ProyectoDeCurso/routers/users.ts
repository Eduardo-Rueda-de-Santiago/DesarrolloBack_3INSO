import express from "express";

import controller from "../controllers/users";

/**
 * Crea un objeto router.
 */
const usersRouter = express.Router();

usersRouter.get("/test", controller.test);

// Exporta el router una vez definidos todos los endpoints.s
export { usersRouter };
