import express from "express";

import controller from "../controllers/tracks";

/**
 * Crea un objeto router.
 */
const tracksRouter = express.Router();

tracksRouter.post("/", controller.createTrack);
tracksRouter.get("/", controller.getAllTracks);
tracksRouter.get("/:id", controller.getById);

// Exporta el router una vez definidos todos los endpoints.s
export { tracksRouter };
