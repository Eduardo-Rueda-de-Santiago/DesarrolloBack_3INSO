import mongoose from "mongoose";
export default class MongooseService{

	constructor(){

	};

	public async test():Promise<any>{

		return mongoose.connect(process.env.MONGO_DB_URI);
	}

}
