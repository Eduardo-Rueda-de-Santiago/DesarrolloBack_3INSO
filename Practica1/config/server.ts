import express from "express";
import router from "./routes";
import cors from 'cors';
import mongooseConnect from "./mongo";
import fileUpload from 'express-fileupload';

/**
 * Crea el servidor con toda la configuración necesaria.
 * @returns Un objeto de servidor.
 */
export default function createServer(): any {

	const server = express();

	// Control de accesos al servidor, aquí irian listas de IPs o dominions, por ahora en blanco.
	server.use(cors());

	// Permite tratar los cuerpos de las requests como si fueran jsons.
	server.use(express.json());

	// Añadir los ficheros estáticos
	server.use(express.static('assets'));

	// Permitir la subida de ficheros.
	server.use(fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
		safeFileNames: true,
		preserveExtension: true
	}));

	// Añade el objeto router que el servidor usará.
	server.use(router);

	// Conectar a la base de datos
	mongooseConnect();

	return server;
}
