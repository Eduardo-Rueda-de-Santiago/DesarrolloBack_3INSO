import StorageModel from "../models/nosql/storage";
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
function test(req: any, res: any) {

	// Siempre debe haber try catch para que aunque falle la operación el servidor no se caiga.
	try {

		// Crea un nuevo objeto de servicio.
		const exampleService = new ExampleService();

		return res.status(200).send({
			text: "Thou arth seeing an example!",
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

async function createItem(req: any, res: any) {

	try {

		const { body, file } = req;

		console.log(file)
		const fileData = {
			filename: file.filename,
			url: process.env.PUBLIC_URL
		}

		const data = await StorageModel.create(fileData);

		return res.send(data);

	} catch (error: any) {

	}

}

/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	test,
	createItem
};
