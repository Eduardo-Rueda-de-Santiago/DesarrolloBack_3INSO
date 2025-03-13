import { Schema } from "mongoose";

const ValidationSubmodel =
{
	validationCode: {
		type: Schema.Types.Number,
		select: false
	},
	validationAttempts: {
		type: Schema.Types.Number,
		select: false
	},
	validationDate: {
		type: Schema.Types.Date,
	}
};


export default ValidationSubmodel;
