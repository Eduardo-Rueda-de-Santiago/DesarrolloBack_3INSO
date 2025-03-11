import { Schema } from "mongoose";

const AddressSubmodel =
{
	province: {
		type: Schema.Types.String,
	},
	city: {
		type: Schema.Types.String,
	},
	street: {
		type: Schema.Types.String,
	},
	number: {
		type: Schema.Types.Number,
	},
	postal: {
		type: Schema.Types.Number,
	}
};


export default AddressSubmodel;