import UserService from "../services/user";

export async function registerUser(req: any, res: any) {

	try {

		res.status(200).send(await new UserService().createUser({}))

	} catch (error: any) {

	}

}