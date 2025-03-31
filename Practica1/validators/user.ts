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

export const loginUser = [

	body("email")
		.isEmail().withMessage("Se debe introducir un email")
		.isLength({ max: 100 }).withMessage("El tamaño máximo del email son 100 caracteres."),

	body("password")
		.isString()
		.isLength({ min: 8, max: 50 }).withMessage("La contraseña debe tener entre 8 y 50 caracteres."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const recoverPassword = [

	body("email")
		.isEmail().withMessage("Se debe introducir un email")
		.isLength({ max: 100 }).withMessage("El tamaño máximo del email son 100 caracteres."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const validateEmail = [

	body("code")
		.exists().withMessage("Se debe el código de validación")
		.notEmpty().isNumeric().withMessage("Debe ser un número"),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const editUserCompany = [

	body("name")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),


	body("cif")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("street")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("number")
		.isNumeric(),

	body("postal")
		.isNumeric(),

	body("city")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("province")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const editUserProfile = [

	body("email")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("name")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("surnames")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	body("nif")
		.isAlphanumeric()
		.isLength({ max: 100 }).withMessage("El tamaño máximo son 100 caracteres."),

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const editUserLogo = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const getUserData = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]

export const deleteUser = [

	(req: any, res: any, next: any) => validateResults(req, res, next)

]