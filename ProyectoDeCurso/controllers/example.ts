import ExampleService from "../services/example";

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function exampleGet(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		// Responde a la petición
		return res.status(200).send({
			text: "Thou arth seeing an example GET!",
			fetchedData: exampleService.getUsefulArray()
		});

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example GET controller failed!",
			error: error.message
		});

	}

}

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePost(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		return res.status(200).send({
			text: "Thou arth seeing an example POST!",
			fetchedData: exampleService.getUsefulNumber()
		});

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example POST controller failed!",
			error: error.message
		});

	}
}

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePut(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		return res.status(200).send({
			text: "Thou arth seeing an example PUT!",
			fetchedData: exampleService.getUsefulString()
		});

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example PUT controller failed!",
			error: error.message
		});

	}
}

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function examplePatch(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		return res.status(200).send({
			text: "Thou arth seeing an example PATCH!",
			fetchedData: exampleService.getUsefulBool()
		});


	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example PATCH controller failed!",
			error: error.message
		});

	}
}

/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function exampleDelete(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		throw new Error("Ejemplo de fallo de controlador");

		return res.status(200).send("Thou arth seeing an example DELETE!");

	} catch (error: any) {

		// Al menos poned un pequeño mensaje de ejemplo para que se sepa de donde proviene el error.
		return res.status(500).send({
			alert: "The example DELETE controller failed!",
			error: error.message
		});

	}
}

/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	exampleGet,
	examplePost,
	examplePut,
	examplePatch,
	exampleDelete
};
