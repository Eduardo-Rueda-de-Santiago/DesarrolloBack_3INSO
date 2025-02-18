import multer from "multer";
import path from "path";
import fs from "fs";

export default class StorageService {

	private readonly storagePath: string;

	constructor() {
		this.storagePath = path.join(__dirname, "..", "storage");
	}

	private createStorageDirIfNotExists(): void {

		if (!fs.existsSync(this.storagePath)) {

			fs.mkdirSync(this.storagePath);
		}

	}

	public
}
const storage = multer.diskStorage({
	destination: function (req, file, callback) { //Pasan argumentos automáticamente
		const pathStorage = __dirname + "/../storage"
		callback(null, pathStorage) //error y destination
	},
	filename: function (req, file, callback) { //Sobreescribimos o renombramos
		//Tienen extensión jpg, pdf, mp4
		const ext = file.originalname.split(".").pop() //el último valor
		const filename = "file-" + Date.now() + "." + ext
		callback(null, filename)
	}
})
const uploadMiddleware = multer({ storage }) //Middleware entre la ruta y el controlador
module.exports = uploadMiddleware