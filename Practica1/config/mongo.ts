import mongoose from "mongoose";

/**
 * Connect to the mongo database
 */
const mongooseConnect = () => {

	try {

		const db_uri = process.env.MONGO_DB_URI;

		mongoose.set('strictQuery', false);
		
		mongoose.connect(db_uri);
		
		mongoose.connection.on("connected", () => {
			console.log("Conexión con mongoDb iniciada sin problemas.");
		});

	} catch (error: any) {

		console.error("Error conectando a la base de datos");

	}

};

export default mongooseConnect;