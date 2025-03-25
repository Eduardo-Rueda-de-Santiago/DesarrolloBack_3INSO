import express from "express";
import controller from "../controllers/storage";
import * as storage from "../services/storage";

/**
 * Crea un objeto router.
 */
const storageRouter = express.Router();

storageRouter.get("/test", controller.test);

storageRouter.post("/", storage.uploadMiddleware.single("image"), controller.createItem);

storageRouter.patch("/", storage.uploadMiddlewareMemory.single("image"), controller.updateImage);

// Exporta el router una vez definidos todos los endpoints.
export { storageRouter };
