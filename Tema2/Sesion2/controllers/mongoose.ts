/**
 * Ejemplo de un controlador.
 * Las req y res no se pueden tipar, pero el resto si se debería. 'any' no clarifica los contenidos!
 * Un controlador nunca puede llamar a otro controlador, solo a servicios!
 * 
 * @param req Request
 * @param res Response
 * @returns La respuesta después de realizar las acciones.
 */
function test(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

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
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	test
};
