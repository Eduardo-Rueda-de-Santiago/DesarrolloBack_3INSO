import { handleRequestError } from "../errors/requestError";
import JsonWebTokenService from "../services/jsonWebToken";
import UserService from "../services/user";

/**
 * Checks if the token in the request exists and is valid in the database.
 * Also adds a user field to the query with the object of the user who launched the query.
 * 
 * @param req Request
 * @param res Response
 * @param next Next field
 */
export default async function auth(req: any, res: any, next: any) {

	try {

		if (!req.header('Authorization')) {
			throw new Error("No hay cabecera de autorización.");
		}

		const token = req.header('Authorization').split(" ").pop();

		if (!token) {
			throw new Error("No hay token en la autorización!");
		}

		const jsonWebTokenService: JsonWebTokenService = new JsonWebTokenService();

		const decoded = jsonWebTokenService.verifyToken(token);

		const userService: UserService = new UserService();

		const user = await userService.getUserById(decoded.id);

		if (!user) {
			throw new Error("The user doesn\'t exist!");
		}

		req.user = user;

		next();

	} catch (error) {

		handleRequestError(res, 401, error);

	}
}