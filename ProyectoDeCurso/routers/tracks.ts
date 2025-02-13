import express from "express";

import controller from "../controllers/tracks";

/**
 * Crea un objeto router.
 */
const tracksRouter = express.Router();

tracksRouter.get("/test", controller.test);

// Exporta el router una vez definidos todos los endpoints.s
export { tracksRouter };
