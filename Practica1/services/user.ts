import { UserBasicDataInterface, UserFullDataInterface, UserMongoInterface } from "../interfaces/user";
import UserModel from "../models/nosql/user";
import { generateRandomNumber } from "./validationCode";

/**
 * Servicio del usuario.
 * Aquí se realiza toda la comunicación con la base de datos que tiene que ver con los usuarios.
 */
export default class UserService {

	constructor() {

	}

	/**
	 * Comprueba si ya existe algún usuario con el email que se pase.
	 * @param email Email a verificar
	 * @returns Si está libre
	 */
	public async checkEmailAvailable(email: string): Promise<boolean> {

		try {

			let emailAvailable: boolean = true;

			// Busca un usuario en la base de datos con el email.
			const userObject = await UserModel.findOne({ email });

			// Si hay un match, el amil no está disponible.
			if (userObject) {
				emailAvailable = false;
			}

			return emailAvailable;

		} catch (error) {

			console.error(error)
			throw new Error("Error checking if email is available");

		}
	}

	/**
	 * Crea un usuario en la base de datos.
	 * @param userData Datos del usuario que se quiere crear.
	 * @returns El objeto del usaurio creado en la base de datos.
	 */
	public async createUser(userData: UserBasicDataInterface): Promise<UserMongoInterface> {

		try {

			// Crea el usuario
			const user = await UserModel.create(userData);

			// Busca el usuario en la base de datos. Con esto se fuerza a se apliquen las reglas de búsqueda en vez de devolver la contraseña.
			return await this.getUserById(user._id.toString());

		} catch (error) {

			console.error(error)
			throw new Error("Error adding user to the database");

		}

	}

	/**
	 * Get an user object from the database by ID.
	 * @param userId Id of the user
	 * @returns The object of the user
	 */
	public async getUserById(userId: string): Promise<UserMongoInterface> {

		try {

			// Busca un usuario según su id.
			return await UserModel.findById<UserMongoInterface>(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by id");

		}
	}

	/**
	 * Generates a new validation code and returns the validation data.
	 * @param userId The id of the user.
	 * @returns The user object with auth data.
	 */
	public async generateUserValidationCode(userId: string): Promise<UserMongoInterface> {
		try {

			const user = await this.getUserValidationData(userId);

			user.set('validationData.validationCode', generateRandomNumber());

			await user.save();

			return await this.getUserValidationData(userId);

		} catch (error) {
			console.error(error)
			throw error;
		}
	}


	/**
	 * Generates a new password change code
	 * @param userId The id of the user.
	 * @returns The user object with auth data.
	 */
	public async generatePasswordChangeCode(userId: string): Promise<UserMongoInterface> {
		try {

			const user = await this.getUserValidationData(userId);

			user.set('validationData.resetPasswordCode', generateRandomNumber());

			await user.save();

			return await this.getUserValidationData(userId);

		} catch (error) {
			console.error(error)
			throw error;
		}
	}

	/**
	 * Get an user object from the database by email.
	 * @param email Email of the user
	 * @returns The object of the user
	 */
	public async getUserByEmail(email: string): Promise<UserMongoInterface> {

		try {

			// Busca un usuario según su email.
			return await UserModel.findOne<UserMongoInterface>({ email: email });

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by email");

		}
	}

	/**
	 * Get an user object auth data from the database by email.
	 * @param email Email of the user
	 * @returns The object of the user with the fields of email and password
	 */
	public async getUserAuthData(email: string): Promise<UserMongoInterface> {

		try {

			// Busca un usuario según su email. Adicionalmente, selecciona su contraseña de manera explicita.
			return await UserModel.findOne<UserMongoInterface>({ email: email }).select("email +password");

		} catch (error) {

			console.error(error)
			throw new Error("Error getting user auth data.");

		}
	}


	/**
	 * Get an user object with the validation data.
	 * @param userId Id of the user
	 * @returns The object of the user with the fields of email and validation data
	 */
	public async getUserValidationData(userId: string): Promise<any> {

		try {

			// Busca un usuario según su id. Adicionalmente, selecciona sus datos de validación de manera explicita.
			return await UserModel.findById(userId).select("email +validationData");

		} catch (error) {

			console.error(error)
			throw new Error("Error getting user auth data.");

		}
	}

	/**
	 * Updates the user with a given id, changing the given data.
	 * @param userId The Id of the user to update
	 * @param userData The data to update
	 * @returns The updated object of the user
	 */
	public async updateUserById(userId: string, userData: UserFullDataInterface): Promise<UserMongoInterface> {

		try {

			// Actualiza el usuario
			await UserModel.updateOne({ _id: userId }, userData);

			// Una vez actualizado lo vuelve a buscar para obtener los nuevos datos (mongoose no deveulve el objeto actualizado).
			return await this.getUserById(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error looking up user by id");

		}
	}

	/**
	 * Attempts to validate the user with the validation code.
	 * @param validationCode The code to validate the user with.
	 * @param userId The id of the user to validate.
	 * @returns The validated user.
	 */
	public async attmeptUserValidation(validationCode: number, userId: string): Promise<UserMongoInterface> {
		try {

			const userValidationData = await this.getUserValidationData(userId);

			userValidationData.set('validationData.validationAttempts', (userValidationData.validationData.validationAttempts - 1));

			if (userValidationData.validationData.validationCode === validationCode) {

				userValidationData.set('validationData.validationDate', new Date());

			} else {

				await userValidationData.save();
				throw new Error("El código de validación no es correcto.");

			}

			await userValidationData.save();

			return await this.getUserById(userId);

		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	/**
	 * Checks if there are validation attempts left.
	 * @param userId The id of the user.
	 * @returns Wether the user has any validations attempts left.
	 */
	public async checkIfValidationAttemptsLeft(userId: string): Promise<boolean> {
		try {

			const userValidationData = await this.getUserValidationData(userId);

			return userValidationData.validationData.validationAttempts > 0;

		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	/**
	 * Reset the validation attemps of the user.
	 * @param userId The id of the user to reset validations attemp.
	 */
	public resetValidationAttempts(userId: string): void {
		try {

			this.getUserValidationData(userId).then((user) => {
				user.set('validationData.validationAttempts', Number(process.env.EMAIL_VALIDATION_ATTEMPS || 3));
				user.save();
			})

		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	/**
	 * Deletes a user with the given ID.
	 * @param userId User Id
	 * @returns The object of teh user that has been deleted.
	 */
	public async deleteUserById(userId: string) {

		try {

			// Borra el usuario.
			return await UserModel.findByIdAndDelete(userId);

		} catch (error) {

			console.error(error)
			throw new Error("Error deleting user by id");

		}
	}

}