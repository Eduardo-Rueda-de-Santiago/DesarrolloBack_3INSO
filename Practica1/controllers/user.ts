import UserService from "../services/user";

export function registerUser(req: any, res: any) {

	try {

		res.status(200).send(new UserService().createUser({}))

	} catch (error: any) {

	}

}