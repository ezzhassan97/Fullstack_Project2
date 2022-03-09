// import supertest from "supertest";
// import app from "../../server";
// import userModel from "../../models/user.model";

// import User from "../../types/user.type";
// import db from "../../database/database";

// const request = supertest(app);
// let token = "";

// const userM = new userModel();

// describe(" Users API Endpoint ", () => {
// 	const user = {
// 		username: "testname",
// 		firstname: "firsttest",
// 		lastname: "lasttest",
// 		password: "testpassword",
// 	} as User;

// 	beforeAll(async () => {
// 		const createdUser = await userM.create(user);
// 		user.id = createdUser.id;
// 		console.log(user.id);
// 	});

// 	afterAll(async () => {
// 		const conn = await db.connect();
// 		const sql = "DELETE FROM users;";
// 		await conn.query(sql);
// 		conn.release();
// 	});
// 	it("User Authenticate Endpoint", async () => {
// 		const res = await request
// 			.post("/api/users/authenticate")
// 			.set("content-type", "application/json")
// 			.send({ username: "testname", password: "testpassword" });
// 		expect(res.status).toBe(200);

// 		const username = res.body.username;
// 		const firstname = res.body.firstname;
// 		const lastname = res.body.lastname;
// 		token = res.body.token;

// 		expect(username).toEqual(user.username);
// 		expect(firstname).toEqual(user.firstname);
// 		expect(lastname).toEqual(user.lastname);
// 	});

// 	it("User Create Endpoint", async () => {
// 		const res = await request
// 			.post("/api/users")
// 			.set("content-type", "application/json")
// 			.set("Authorization", `Bearer${token}`)
// 			.send({
// 				username: "testname2",
// 				firstname: "firsttest",
// 				lastname: "lasttest",
// 				password: "testpassword2",
// 			} as User);
// 		expect(res.status).toBe(200);

// 		const username = res.body.username;
// 		const firstname = res.body.firstname;
// 		const lastname = res.body.lastname;

// 		expect(username).toEqual("testname2");
// 		expect(firstname).toEqual("firsttest");
// 		expect(lastname).toEqual("lasttest");
// 	});

// 	it("User Show Endpoint", async () => {
// 		const res = await request
// 			.get(`/api/users/${user.id}`)
// 			.set("content-type", "application/json")
// 			.set("Authorization", `Bearer ${token}`);
// 		expect(res.status).toBe(200);

// 		const id = res.body.id;
// 		const username = res.body.username;
// 		const firstname = res.body.firstname;
// 		const lastname = res.body.lastname;
// 		expect(id).toBe(user.id);
// 		expect(username).toBe("testname");
// 		expect(firstname).toBe("firsttest");
// 		expect(lastname).toBe("lasttest");
// 	});

// 	it("User Index Endpoint", async () => {
// 		const res = await request
// 			.get("/api/users")
// 			.set("content-type", "application/json")
// 			.set("Authorization", `Bearer ${token}`);
// 		expect(res.status).toBe(200);
// 		const allUsers = res.body;
// 		expect(allUsers.length).toEqual(2);
// 	});
// });
