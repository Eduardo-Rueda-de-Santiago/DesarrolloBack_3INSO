import UserModel from "../models/users";
import { Model } from "mongoose";
export default class MongooseService {

	constructor() {

	};

	public test():  any{

		const newUser = new UserModel({
			name:"Eduardo",
			age:20,
			password:"I'm a super safe password!"
		});

		newUser.save();
		
		return newUser;

	}


}
