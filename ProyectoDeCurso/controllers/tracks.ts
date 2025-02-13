import TracksModel from "../models/nosql/tracks";
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
async function getAllTracks(req: any, res: any) {

	const data = await TracksModel.find();

	return res.status(200).send(data);

}

async function createTrack(req: any, res: any) {

	const { body } = req;

	const data = await TracksModel.create(body);

	return res.status(200).send(data);
}

/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	getAllTracks,
	createTrack
};
