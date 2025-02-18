import express from "express";
import controller from "../controllers/storage";
import uploadMiddleware from "../services/storage";

/**
 * Crea un objeto router.
 */
const storageRouter = express.Router();

storageRouter.get("/test", controller.test);
 
storageRouter.post("/", uploadMiddleware.single("image"), controller.createItem);

// Exporta el router una vez definidos todos los endpoints.s
export { storageRouter };
