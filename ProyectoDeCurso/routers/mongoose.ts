

import express from "express";

import controller from "../controllers/mongoose";

/**
 * Crea un objeto router.
 */
const mongooseRouter = express.Router();

mongooseRouter.get("/test", controller.test);

// Exporta el router una vez definidos todos los endpoints.s
export { mongooseRouter };
