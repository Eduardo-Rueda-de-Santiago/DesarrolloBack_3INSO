import UserService from "../services/user";
import CypherService from "../services/cypher";
import { matchedData } from "express-validator";
import { UserInterface } from "../interfaces/user";

export async function registerUser(req: any, res: any) {

	try {


		const userService: UserService = new UserService();
		const cypherService: CypherService = new CypherService();

		// Extra los datos del cuerpo.
		const { email, password } = matchedData(req);

		// Encripta la contraseña
		const hashedPassword: string = await cypherService.encryptString(password);

		// Formatea los datos en una interfaz de datos de usuario.
		const userData: UserInterface = {
			email: email,
			password: hashedPassword
		}

		// Crea el objeto.
		const userObject = await userService.createUser(userData);

		res.status(200).send(userObject);

	} catch (error: any) {

	}

}