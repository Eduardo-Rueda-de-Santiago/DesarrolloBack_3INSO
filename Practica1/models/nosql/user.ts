import { Schema, model } from "mongoose";
import AddressSubmodel from "./submodels/address";

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

		verificationCode: {
			type: Schema.Types.Number
		},

		name: {
			type: Schema.Types.String
		},

		surnames: {
			type: Schema.Types.String
		},

		nif: {
			type: Schema.Types.String,
			unique: true
		},

		validationDate: {
			type: Schema.Types.Date
		},

		role: {
			type: Schema.Types.String,
			enum: ["guest", "user", "admin"]
		},

		address: AddressSubmodel,

		company: {
			name: {
				type: Schema.Types.Number,
			},
			cif: {
				type: Schema.Types.Number,
				unique: true
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
