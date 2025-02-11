import express from "express";
import { exampleRouter } from "../routers/example";
import { mongooseRouter } from "../routers/mongoose";

/**
 * Crea un objeto router.
 */
const router = express.Router();

/**
 * Asigna un subdominio del servidor a un router en concreto.
 */
router.use('/example', exampleRouter);
router.use('/mongoose', mongooseRouter);

/**
 * Lo que devuelve si todos los demás routers por encima no se encontró la dirección buscada.
 * Tiene que estar abajo del todo porque los routers son como los switch, van de arriba abajo y si pillan un resultado válido no siguen buscando.
 */
router.use('*', function (req: any, res: any) {
	res.status(404).send("<h1>404! Skill issue!</h1>");
});

//Exporta el router una vez definidos todos los sub routers.
export { router };