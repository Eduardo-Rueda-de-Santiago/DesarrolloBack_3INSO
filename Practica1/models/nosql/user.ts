import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

import AddressSubmodel from "./submodels/address";
import ValidationSubmodel from "./submodels/validation";

/**
 * Crear el esquema del usuario
 */
const UserSchema = new Schema(
	{
		// El email.
		email: {
			type: Schema.Types.String,
			unique: true
		},
		// Contraseña cifrada, marcada para que no se devuelva en los select.
		password: {
			type: Schema.Types.String,
			select: false
		},

		name: {
			type: Schema.Types.String
		},

		surnames: {
			type: Schema.Types.String
		},

		nif: {
			type: Schema.Types.String,
		},

		role: {
			type: Schema.Types.String,
			enum: ["guest", "user", "admin"]
		},

		address: AddressSubmodel,

		validationData: {
			type: new Schema({ ...ValidationSubmodel }, { _id: false }),
			select: false
		},

		company: {
			name: {
				type: Schema.Types.Number,
			},
			cif: {
				type: Schema.Types.Number,
			},
			address: AddressSubmodel,
		}

	},
	{
		// Guarda Los tiempos de creación.
		timestamps: true,
		versionKey: false
	}

);

// Sobreescribir el método de delete para hacer un soft delete.
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" })

/**
 * Crear un modelo de mongoose.
 */
const UserModel = model('User', UserSchema);

/**
 * Exportarlo.
 * No debería de cambiar nada en la base de datos.
 * Se actualizara con este documento una vez que sea usado por primera vez.
 */
export default UserModel;
