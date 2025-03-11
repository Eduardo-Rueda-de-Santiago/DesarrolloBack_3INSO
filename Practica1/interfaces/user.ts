import AddressInterface from "./address";
import MongodbObject from "./mongodbObject";

export interface UserInterface {

	email: string,
	password: string,
	verificationCode?: number,
	name?: string,
	surname?: string,
	nif?: string,
	validationDate?: Date,
	role?: string,
	address?: AddressInterface,
	
	company?: {
	
		name: string,
		cif: string,
		address?: AddressInterface
	
	}

}

export interface UserMongoInterface extends UserInterface, MongodbObject {

}