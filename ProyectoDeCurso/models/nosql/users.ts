import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		name: {
			type: String
		},
		age: {
			type: Number
		},
		password:{
			type:String,
			select:false
		}
	},
	{
		timestamps: true,
		versionKey: false
	}

);	

const UserModel = model('User', UserSchema);

export default UserModel;