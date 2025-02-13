import express from "express";

import controller from "../controllers/storage";

/**
 * Crea un objeto router.
 */
const storageRouter = express.Router();

storageRouter.get("/test", controller.test);

// Exporta el router una vez definidos todos los endpoints.s
export { storageRouter };
