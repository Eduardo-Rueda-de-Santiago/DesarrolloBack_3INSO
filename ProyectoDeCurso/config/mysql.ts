import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
// 	// database: process.env.MYSQL_DATABASE,
// 	username: "root",
// 	password: "password",
// 	host: "10.1.205.95",
// 	port: 3306,
// 	dialect: "mysql",
// });
export const sequelize = new Sequelize("mysql://um8ewsw2zts1oij0:dYUmVULurjbuY5p0m1RK@bnobmuqt1igaprlxstnm-mysql.services.clever-cloud.com:3306/bnobmuqt1igaprlxstnm");
export const dbConnectMySql = async () => {
	try {
		await sequelize.authenticate()
		console.log("MySQL conexión correcta")
	} catch (err) {
		console.log("MySQL error de conexión:", err)
	}
}