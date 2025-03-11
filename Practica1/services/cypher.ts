import bcrypt from 'bcrypt';

/**
 * Servicio para realizar operaciones de cifrado.
 */
export default class CypherService {

	private readonly encryptionRounds: number;

	constructor() {

		this.encryptionRounds = Number(process.env.ENCRYPTION_ROUNDS);

	}

	/**
	 * Encripta una cadena de texto.
	 * @param stringToEncrypt Cadena de texto que se quiere encriptar.
	 * @returns Hash de la cadena pasada a la función
	 */
	public async encryptString(stringToEncrypt: string): Promise<string> {

		// Genera el salt.
		const salt = await bcrypt.genSalt(this.encryptionRounds);

		// Encripta el string.
		return await bcrypt.hash(stringToEncrypt, salt);

	}

	/**
	 * Comprueba si un string proviene o no de un hash dado.
	 * @param stringToCheck String que se quiere comprobar.
	 * @param hashRecorded El hash que se supone que cuadra con el string.
	 */
	public async checkIfStringMatchesHash(stringToCheck: string, hashRecorded: string) {

		return bcrypt.compare(stringToCheck, hashRecorded);
		
	}
}
