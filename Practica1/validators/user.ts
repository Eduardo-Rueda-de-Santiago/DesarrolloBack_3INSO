import { body } from "express-validator";
import validateResults from "../services/validator";

export const registerUser = [

	body("email")
		.isEmail().withMessage("Se debe introducir un email")
		.isLength({ max: 100 }).withMessage("El tamaño máximo del email son 100 caracteres."),

	body("password")
		.isString()
		.isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("La contraseña debe tener al menos una minúscula, una mayúscula, un número y un símbolo.")
		.isLength({ min: 8, max: 50 }).withMessage("La contraseña debe tener entre 8 y 50 caracteres."),

	(req: any, res: any, next: any) => validateResults(req, res, next)
];