import mongoose from "mongoose";
export default class MongooseService{

	constructor(){

	};

	public async test():Promise<any>{

		return mongoose.connect('mongodb://127.0.0.1:6000/test');
	}

}
