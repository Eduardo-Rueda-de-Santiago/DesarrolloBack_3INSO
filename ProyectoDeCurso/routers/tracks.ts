import express from "express";
import controller from "../controllers/tracks";
import * as validator from "../validators/tracks"

/**
 * Crea un objeto router.
 */
const tracksRouter = express.Router();

tracksRouter.post("/", validator.validatorCreateItem, controller.createTrack);
tracksRouter.get("/", controller.getAllTracks);
tracksRouter.get("/:id", validator.validatorGetItem, controller.getById);
// tracksRouter.put("/:id", validator.validatorGetItem, controller.updateById);
// tracksRouter.delete("/:id", validator.validatorGetItem, controller.deleteById);

// Exporta el router una vez definidos todos los endpoints.s
export { tracksRouter };
