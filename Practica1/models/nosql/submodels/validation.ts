import { Schema } from "mongoose";

const ValidationSubmodel =
{
	validationCode: {
		type: Schema.Types.Number,
		select: false
	},
	validationAttempts: {
		type: Schema.Types.Number,
		select: false,
		default: Number(process.env.EMAIL_VALIDATION_ATTEMPS || 3)
	},
	validationDate: {
		type: Schema.Types.Date,
	},
	resetPasswordCode: {
		type: Schema.Types.String,
	},
};

export default ValidationSubmodel;
