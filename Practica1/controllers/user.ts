import UserService from "../services/user";
import CypherService from "../services/cypher";
import { matchedData } from "express-validator";
import { UserBasicDataInterface, UserFullDataInterface, UserMongoInterface } from "../interfaces/user";
import generateValidationCode from "../services/validationCode";
import MailerService from "../services/mailer";
import JsonWebTokenService from "../services/jsonWebToken";
import { handleRequestError } from "../errors/requestError";

/**
 * Registra un usuario.
 * @param req Request
 * @param res response
 */
export async function registerUser(req: any, res: any) {

	try {

		const userService: UserService = new UserService();
		const cypherService: CypherService = new CypherService();
		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		// Extra los datos del cuerpo.
		const { email, password } = matchedData(req);

		// Encripta la contraseña
		const hashedPassword: string = await cypherService.encryptString(password);

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserBasicDataInterface = {
			email: email,
			password: hashedPassword,
		}

		// Crea el objeto.
		const userObject = await userService.createUser(userData);

		// Crea un token.
		const token = jsonWebTokenService.generateToken({ id: userObject._id.toString() });

		// Manda la respuesta
		res.status(200).send({ userObject, token });

		await userService.generateUserValidationCode(userObject._id);
		userService.getUserValidationData(userObject._id).then((user: UserMongoInterface) => {
			sendValidationEmail(user);
		});

	} catch (error: any) {

		handleRequestError(res, 500, new Error("Error registering user."));

	}

}

/**
 * Realiza el login.
 * 
 * @param req Request
 * @param res Response
 * @returns Token de autenticación para el usuario.
 */
export async function loginUser(req: any, res: any) {

	try {

		// Crea los servicios
		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserBasicDataInterface = {
			...matchedData(req)
		}

		// Comrprueba que los datos de autenticación sean correctos.
		const userFullData: UserMongoInterface = await checkAuthData(userData);

		// Genera el token del usuario.
		const token = jsonWebTokenService.generateToken({ id: userFullData._id.toString() });

		// Devuelve el objeto creado.
		res.status(201).send({ token: token, user: userFullData });

	} catch (error: any) {

		handleRequestError(res, 500, new Error("The operation to log in failed!"));

	}

}

/**
 * Comprueba que los datos de autenticación del usuario sean correctos.
 * @param userData Los datos del usuario
 * @return El usuario con todos sus datos su la autenticación es correcta.
 */
async function checkAuthData(userData: UserBasicDataInterface): Promise<any> {

	// Crea los servicios
	const userService: UserService = new UserService();
	const cypherService: CypherService = new CypherService();

	// Obtener el usuario.
	const userAuthData = await userService.getUserAuthData(userData.email);

	// Comprueba que el usuario existiese en el sistema.
	if (!userAuthData) {
		throw new Error("No existe un usuario con este email!")
	}

	// Obtener el usuario.
	const userValidationData = await userService.getUserValidationData(userAuthData._id);

	// Comprueba que el usuario existiese en el sistema.
	if (userValidationData.validationData?.validationDate === undefined) {
		throw new Error("Se debe hacer la validación de email antes de acceder a la plataforma!")
	}

	// Comprueba que la contraseña sea correcta.
	const passwordMatch: boolean = await cypherService.checkIfStringMatchesHash(userData.password, userAuthData.password);

	if (!passwordMatch) {
		throw new Error("La contraseña no es correcta!")
	}

	return await userService.getUserById(userAuthData._id.toString());

}

/**
 * 
 * @param req 
 * @param res 
 */
export async function recoverPassword(req: any, res: any) {
	try {

		res.status(501).send("Not yet implemented!");

	} catch (error) {

		handleRequestError(res, 500, error);

	}
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function validateEmail(req: any, res: any) {

	// Crea los servicios
	const userService: UserService = new UserService();
	const userId = req.user._id.toString();

	try {

		// Extrae parámetros
		const { code } = matchedData(req);

		const user: UserMongoInterface = await userService.attmeptUserValidation(code, userId);

		// Probar a introducir el código
		res.status(200).send(user);

	} catch (error) {

		let errorSent: Error = error;

		if (!await userService.checkIfValidationAttemptsLeft(userId)) {
			await userService.generateUserValidationCode(userId);
			userService.getUserValidationData(userId).then((user: UserMongoInterface) => {
				sendValidationEmail(user);
			});
			errorSent = new Error("No validations attemps left! Validation email resent");
		}

		handleRequestError(res, 401, errorSent);
	}

}

/**
 * 
 * @param req 
 * @param res 
 */
export async function editUserCompany(req: any, res: any) {
	try {

		// Obtener datos
		res.status(501).send("Not yet implemented!");

	} catch (error) {

		handleRequestError(res, 500, error);

	}
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function editUserLogo(req: any, res: any) {
	try {

		// Obtener fichero
		// Subir a pinata
		// Actualizar el link en la bbdd
		// Tiene que ir el logo a pinata?
		res.status(501).send("Not yet implemented!");

	} catch (error) {

		handleRequestError(res, 500, error);

	}
}

/**
 * Returns the full data of the user who made this request.
 * @param req Request.
 * @param res Response.
 */
export async function getUserData(req: any, res: any) {
	try {

		res.status(200).send(req.user);

	} catch (error) {

		handleRequestError(res, 500, error);

	}
}

/**
 * Deletes the user who made this request.
 * @param req Request.
 * @param res Response.
 */
export async function deleteUser(req: any, res: any) {
	try {

		const { _id } = req.user._id

		const userService: UserService = new UserService();

		const user = await userService.deleteUserById(_id);

		res.status(200).send(user);

	} catch (error) {

		handleRequestError(res, 500, error);

	}
}

/**
 * Sends the validation email.
 * @param userValidationData The user validation data.
 */
function sendValidationEmail(userValidationData: UserMongoInterface) {
	try {
		// Create services.
		const mailerService: MailerService = new MailerService();
		const userService: UserService = new UserService();

		// Send stuff
		userService.resetValidationAttempts(userValidationData._id.toString());
		mailerService.sendVerificationCodeEmail(userValidationData.email, userValidationData.validationData.validationCode);

	} catch (error) {
		console.error(error)
	}
}