import AddressInterface from "./address";
import MongodbObject from "./mongodbObject";
import ValidationData from "./validation";

export interface UserInterface {

	// Necesary
	email: string,
	password: string,
	validationData: ValidationData

	// Optional
	name?: string,
	surname?: string,
	nif?: string,
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