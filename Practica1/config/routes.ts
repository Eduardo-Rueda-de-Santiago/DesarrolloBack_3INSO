// External libs
import express from "express";
import swaggerUi from 'swagger-ui-express';

// Internal files
import swaggerDocs from "./swagger";
import userRouter from "../routers/user";


/**
 * Crea un objeto router.
 */
const router = express.Router();

/**
 * Asigna un subdominio del servidor a un router en concreto.
 */
router.use('/api/user', userRouter);
// router.use('/api/member', memberRouter);
// router.use('/api/group', groupRouter);
// router.use('/api/debug', debugRouter);

/**
 * Devuelve la documentación swagger.
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * Lo que devuelve si todos los demás routers por encima no se encontró la dirección buscada.
 * Tiene que estar abajo del todo porque los routers son como los switch, van de arriba abajo y si pillan un resultado válido no siguen buscando.
 */
router.use('*', function (req: any, res: any) {
	res.status(404).send(`
		<h1>404! Not found!</h1>
		<p>We recommend going to our docs on development <a href="http://${process.env.URL}:${process.env.PORT}/api-docs">Swagger</a></p>
		<p>Or try out the production docs <a href="http://${process.env.URL}/api-docs">Swagger</a></p>
		`);
});

//Exporta el router una vez definidos todos los sub routers.
export default router;