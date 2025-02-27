import { check } from "express-validator";
import validateResults from "../services/validators";

export const validatorCreateItem = [
	check("name")
		.exists().withMessage("Must exist!!!")
		.notEmpty().withMessage("Can't be empty!!!")
		.isEmail().withMessage("Must be an email!!!"), //.isLength(min:5, max:90)
	check("album").exists().notEmpty(),
	check("cover").exists().notEmpty(),
	check("artist").exists().notEmpty(),
	check("artist.name").exists().notEmpty(),
	check("artist.nickname").exists().notEmpty(),
	check("artist.nationality").exists().notEmpty(),
	check("duration.start").exists().notEmpty().isInt(),
	check("duration.end").exists().notEmpty().isInt(),
	check("mediaId").exists().notEmpty().isMongoId(),
	(req: any, res: any, next: any) => validateResults(req, res, next)
]

export const validatorGetItem = [
	check("id").exists().notEmpty().isMongoId(),
	(req: any, res: any, next: any) => validateResults(req, res, next)
]
