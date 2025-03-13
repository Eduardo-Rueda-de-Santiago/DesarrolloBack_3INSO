import UserService from "../services/user";
import CypherService from "../services/cypher";
import { matchedData } from "express-validator";
import { UserInterface, UserMongoInterface } from "../interfaces/user";
import generateValidationCode from "../services/validationCode";
import MailerService from "../services/mailer";
import JsonWebTokenService from "../services/jsonWebToken";

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
		const userData: UserInterface = {
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
		const token = jsonWebTokenService.generateToken(userObject);

		// Manda la respuesta
		res.status(200).send({ userObject, token });

		// Obten la validación del objeto
		userService.getUserValidationData(userObject._id)
			.then((userValidationData: UserMongoInterface) => {
				console.log("Sending email", userValidationData)
				mailerService.sendVerificationCodeEmail(userValidationData.email, userValidationData.validationData.validationCode);
			})
			.catch((error => {

			}))

	} catch (error: any) {

	}

}