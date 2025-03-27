import request from "supertest";
import { server } from "../app";

describe('users', () => {

	var token = ""
	var id = ""

	it('should register a user', async () => {
		const response = await request(server)
			.post('/api/auth/register')
			.send({ "name": "Menganito", "age": 20, "email": "user25@test.com", "password": "HolaMundo.01" })
			.set('Accept', 'serverlication/json')
			.expect(200)
		expect(response.body.user.name).toEqual('Menganito')
		expect(response.body.user.email).toEqual('user25@test.com')
		expect(response.body.user.role).toEqual('user')

		token = response.body.token
		id = response.body.user._id
	})
	/*
		it('should get a Unauthorized error', async () => {
			const response = await request(server)
				.get('/api/auth/users')
				.set('Accept', 'serverlication/json')
				.expect(401)
		});
	*/
	it('should get the users', async () => {
		const response = await request(server)
			.get('/api/auth/users')
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
		expect(response.body.pop().name).toEqual('Menganito')
	});

	it('should delete a user', async () => {
		const response = await request(server)
			.delete('/api/auth/users/' + id)
			.auth(token, { type: 'bearer' })
			.set('Accept', 'serverlication/json')
			.expect(200)
		expect(response.body.acknowledged).toEqual(true)
	})

})