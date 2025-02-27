import { validationResult } from "express-validator"

export default function validateResults(req: any, res: any, next: any) {
	try {
		validationResult(req).throw()
		return next()
	} catch (err) {
		res.status(422)
		res.send({ errors: err.array() })
	}
}
