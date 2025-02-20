import StorageModel from "../models/nosql/storage";
import UserModel from "../models/nosql/users";
import ExampleService from "../services/example";
import uploadToPinata from "../services/handleUploadIPFS";

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

		const fileData = {
			filename: file.filename,
			url: process.env.PUBLIC_URL
		}

		const data = await StorageModel.create(fileData);

		return res.send(data);

	} catch (error: any) {

	}

}

async function updateImage(req, res) {
	try {
		const id = req.params.id
		const fileBuffer = req.file.buffer
		const fileName = req.file.originalname
		const pinataResponse = await uploadToPinata(fileBuffer, fileName)
		const ipfsFile = pinataResponse.IpfsHash
		const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
		const data = await UserModel.findOneAndUpdate({ _id: id }, { image: ipfs }, { new: true })
		res.send(data)
	} catch (err) {
		console.log(err)
		res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
		//handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
	}
}

/**
 * Añadir aquí abajo los controladores para que se exporten bien!
 * Se puede poner un export al principio de la función del controlador 'export function nombreFuncion' pero entonces no te autocompletará en el router con el objeto controldor.
 */
export default {
	test,
	createItem,
	updateImage
};
