import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	// database: process.env.MYSQL_DATABASE,
	username: "root",
	password: "password",
	host: "10.1.205.95",
	port: 3306,
	dialect: "mysql",
});
export const dbConnectMySql = async () => {
	try {
		await sequelize.authenticate()
		console.log("MySQL conexión correcta")
	} catch (err) {
		console.log("MySQL error de conexión:", err)
	}
}