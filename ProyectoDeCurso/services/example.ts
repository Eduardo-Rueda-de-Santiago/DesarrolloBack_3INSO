/**
 * Clase de servicio de ejemplo.
 * Debería ser lo único que se importa en un fichero de servicio.
 * Aquí se harán las llamadas a bases de datos u otros servicios.
 * En caso de que sea necesario que el objeto sea único implementar un singleton.
 * No es nada recomendado exportar un objeto de la clase ya que entonces no funcionara ni el autocompletar ni la documentación para saber los métodos asociados a cada servicio.
 */
export default class ExampleService {

	/**
	 * Ejemplo de declaración de atributos.
	 */

	// Declaración de un string
	private usefulString: string;

	// Declaración de un número (no hay diferencias entre int o float, todo es number).
	public usefulNumber: number;

	// Declaración de un booleano
	public readonly usefulBool: boolean; // Esto sería una constante.

	// Declaración de un array de numeros.
	public static readonly usefulArray: Array<number> = new Array<any>(1, 2, 3, 4.5, 5.55); // Cuidado con los atributos estáticas!

	constructor() {

		this.usefulString = "Example";
		this.usefulNumber = 0;
		this.usefulBool = true;

	};

	/**
	 * Es buena práctica tipar el resultado de las funciones.
	 * Ayudan a saber que esperar.
	 * Aunque si caeis en la desesperación y solo quereís hacer que X funcione se puede poner any y tirar.
	 * Con la consecunecia de que luego se desesperará otro intentando ver que viene de vuelta.
	 * 
	 * @returns Un string de ejemplo.
	 */
	public getUsefulString(): string {

		/**
		 * Los servicios simpre deberían ir también entre try/catch por si fallan.
		 * No puedes garantizar que todos los controladores que usen tu servicio tendrán protección de errores.
		 * Pero al menos de la parte que tu hagas puedes controlar que no tire el servidor si falla.
		 */
		try {

			return this.usefulString;

		} catch (error: any) {

			// Mensaje de error de donde se genero el error.
			console.log("Error en el método 'getUsefulString' del servicio 'ExampleService'.");
			/**
			 * Derivarlo hacia controladores.
			 * En algunos casos es esperado que algo de un error, por ejemplo al buscar con un usuario que no existe.
			 * En esos casos quieres que el error siempre llegue arriba para decidir que hacer ahí.
			 */
			throw error;

		}
	}

	public getUsefulNumber(): number {

		try {
			return this.usefulNumber;

		} catch (error: any) {

			// Mensaje de error de donde se genero el error.
			console.log("Error en el método 'getUsefulNumber' del servicio 'ExampleService'.");
			/**
			 * Derivarlo hacia controladores.
			 * En algunos casos es esperado que algo de un error, por ejemplo al buscar con un usuario que no existe.
			 * En esos casos quieres que el error siempre llegue arriba para decidir que hacer ahí.
			 */
			throw error;

		}

	}

	public getUsefulBool(): boolean {
		try {

			return this.usefulBool;

		} catch (error: any) {

			// Mensaje de error de donde se genero el error.
			console.log("Error en el método 'getUsefulBool' del servicio 'ExampleService'.");
			/**
			 * Derivarlo hacia controladores.
			 * En algunos casos es esperado que algo de un error, por ejemplo al buscar con un usuario que no existe.
			 * En esos casos quieres que el error siempre llegue arriba para decidir que hacer ahí.
			 */
			throw error;

		}
	}

	public getUsefulArray(): Array<number> {

		try {

			//Referencia a atributo estático.
			return ExampleService.usefulArray;

		} catch (error: any) {

			// Mensaje de error de donde se genero el error.
			console.log("Error en el método 'getUsefulBool' del servicio 'ExampleService'.");
			/**
			 * Derivarlo hacia controladores.
			 * En algunos casos es esperado que algo de un error, por ejemplo al buscar con un usuario que no existe.
			 * En esos casos quieres que el error siempre llegue arriba para decidir que hacer ahí.
			 */
			throw error;

		}

	}

}