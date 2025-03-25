export function handleRequestError(res: any, code: number, error: Error) {
	console.error(error);
	res.status(code).send(error.message);
}