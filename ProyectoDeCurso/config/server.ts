import express from "express";
import { router } from "./routes";
import cors from 'cors';
import dbConnect from "./mongo";

/**
 * Crea el servidor con toda la configuración necesaria.
 * @returns Un objeto de servidor.
 */
export function createServer(): any {

	try {

		const server = express();

		// Control de accesos al servidor, aquí irian listas de IPs o dominions, por ahora en blanco.
		server.use(cors());

		// Permite tratar los cuerpos de las requests como si fueran jsons.
		server.use(express.json());

		// Añade el objeto router que el servidor usará.
		server.use("/api", router);

		// Definir donde se ponen los ficheros estáticos
		server.use(express.static("storage"));

		dbConnect();

		return server;

	} catch (error) {

		console.log("Error creating server");

	}

}
