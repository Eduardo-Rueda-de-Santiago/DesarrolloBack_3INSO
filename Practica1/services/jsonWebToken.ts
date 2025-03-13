import jwt from "jsonwebtoken";
import { UserMongoInterface } from "../interfaces/user";

/**
 * Servicio para realizar las operaciones de generación/verificación de tokens.
 */
export default class JsonWebTokenService {

	private readonly tokenSecret: string;
	private readonly tokenDuration: string;

	constructor() {

		this.tokenSecret = process.env.TOKEN_KEY_CONTENTS;
		this.tokenDuration = process.env.TOKEN_KEY_DURATION;

	}

	/**
	 * Generate a token
	 * @param userData The user data to generate a token
	 * @returns A JWT token.
	 */
	generateToken(userData: UserMongoInterface): string {

		try {
			const token = jwt.sign({ id: userData._id }, this.tokenSecret, {
				expiresIn: this.tokenDuration,
			});

			return token;
		} catch (error) {

			console.error(error);
			throw new Error("Error de servicio al generar un token.");

		}

	}

	/**
	 * Verifica si el token es válido.
	 * @param tokenToVerify El token a verificar
	 * @returns Si el token es válido.
	 */
	verifyToken(tokenToVerify: string) {
		try {

			return jwt.verify(tokenToVerify, this.tokenSecret);

		} catch (error) {

			console.error(error);
			throw new Error("El token no es válido!");

		}
	}
}