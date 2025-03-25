import AddressInterface from "./address";
import MongodbObject from "./mongodbObject";
import ValidationData from "./validation";

export interface UserBasicDataInterface {
	email?: string,
	password?: string
}
export interface UserFullDataInterface extends UserBasicDataInterface {

	validationData?: ValidationData
	name?: string,
	surname?: string,
	nif?: string,
	role?: string,
	address?: AddressInterface,
	logo: string,
	company?: {
		name: string,
		cif: string,
		address?: AddressInterface
	}

}

export interface UserMongoInterface extends UserFullDataInterface, MongodbObject {

}