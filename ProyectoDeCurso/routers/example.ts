

import express from "express";

import controller from "../controllers/example";

/**
 * Crea un objeto router.
 */
const exampleRouter = express.Router();

/**
 * Asigna a cualquier request de tipo GET la función del controlador de ejemplo 'exampleGet'.
 */
exampleRouter.get("*", controller.exampleGet);


/**
 * Asigna a cualquier request de tipo POST la función del controlador de ejemplo 'examplePost'.
 */
exampleRouter.post("*", controller.examplePost);


/**
 * Asigna a cualquier request de tipo PUT la función del controlador de ejemplo 'examplePut'.
 */
exampleRouter.put("*", controller.examplePut);

/**
 * Asigna a cualquier request de tipo PATCH la función del controlador de ejemplo 'examplePatch'.
 */
exampleRouter.patch("*", controller.examplePatch);

/**
 * Asigna a cualquier request de tipo DELETE la función del controlador de ejemplo 'exampleDelete'.
 */
exampleRouter.delete("*", controller.exampleDelete);

// Exporta el router una vez definidos todos los endpoints.s
export { exampleRouter };
