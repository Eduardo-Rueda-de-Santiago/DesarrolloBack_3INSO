import UserService from "../services/user";
import CypherService from "../services/cypher";
import { matchedData } from "express-validator";
import { UserBasicDataInterface, UserFullDataInterface, UserMongoInterface } from "../interfaces/user";
import generateValidationCode from "../services/validationCode";
import MailerService from "../services/mailer";
import JsonWebTokenService from "../services/jsonWebToken";

/**
 * Registra un usuario.
 * @param req Request
 * @param res response
 */
export async function registerUser(req: any, res: any) {

	try {

		const userService: UserService = new UserService();
		const cypherService: CypherService = new CypherService();
		const mailerService: MailerService = new MailerService();
		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		// Extra los datos del cuerpo.
		const { email, password } = matchedData(req);

		// Encripta la contraseña
		const hashedPassword: string = await cypherService.encryptString(password);

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserFullDataInterface = {
			email: email,
			password: hashedPassword,
			validationData: {
				validationCode: generateValidationCode(),
				validationAttempts: 0
			}
		}

		// Crea el objeto.
		const userObject = await userService.createUser(userData);

		// Crea un token.
		const token = jsonWebTokenService.generateToken({ id: userObject._id.toString() });

		// Manda la respuesta
		res.status(200).send({ userObject, token });

		// Obten la validación del objeto
		userService.getUserValidationData(userObject._id)
			.then((userValidationData: UserMongoInterface) => {
				mailerService.sendVerificationCodeEmail(userValidationData.email, userValidationData.validationData.validationCode);
			})
			.catch((error => {

			}))

	} catch (error: any) {

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

		console.error(error);

		return res.status(500).send({
			alert: "The operation to log in failed!",
			description: error.message
		});

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
		console.log(error);
		res.status(500).send(error)
	}
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function validateEmail(req: any, res: any) {
	try {

		res.status(501).send("Not yet implemented!");

	} catch (error) {
		console.log(error);
		res.status(500).send(error)
	}
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function editUserCompany(req: any, res: any) {
	try {

		res.status(501).send("Not yet implemented!");

	} catch (error) {
		console.log(error);
		res.status(500).send(error)
	}
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function editUserLogo(req: any, res: any) {
	try {

		// Tiene que ir el logo a pinata?
		res.status(501).send("Not yet implemented!");

	} catch (error) {
		console.log(error);
		res.status(500).send(error)
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
		console.log(error);
		res.status(500).send(error)
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
		console.log(error);
		res.status(500).send(error)
	}
}
