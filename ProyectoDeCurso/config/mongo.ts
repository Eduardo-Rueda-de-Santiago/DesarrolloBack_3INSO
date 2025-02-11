import mongoose from "mongoose";

const dbConnect = () => {

	const db_uri = process.env.MONGO_DB_URI;

	mongoose.set('strictQuery', false);

	try {

		mongoose.connect(db_uri);
		mongoose.connection.on("connected", () => {
			console.log("Conexión con mongoDb iniciada sin problemas.");
		});

	} catch (error: any) {

		console.log("Error conectando a la base de datos");

	}

};

export default dbConnect;