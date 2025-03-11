import { validationResult } from "express-validator"

/**
 * Comprueba si ha habido errores de validación.
 * @param req Request
 * @param res response
 * @param next Next
 * @returns Next
 */
export default function validateResults(req: any, res: any, next: any) {
	try {
		
		// Comprueba si se han generado errores.
		validationResult(req).throw()

		// Sino, pasa a la siguiente parte del endpoint.
		return next()

	} catch (err) {
		
		// En caso de error de validación, deveulve código y los errores.
		res.status(422)
		res.send({ errors: err.array() })
	
	}
}