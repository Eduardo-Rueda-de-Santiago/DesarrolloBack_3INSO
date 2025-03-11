import { Schema, model } from "mongoose";

/**
 * Crear el esquema de la dirección.
 */
const AddressSchema = new Schema(
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
	},
	{
		timestamps: true,
		versionKey: false
	});

/**
 * Crear un modelo de mongoose.
 */
const AddressModel = model('Address', AddressSchema);

export default AddressModel;