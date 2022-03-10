import supertest from "supertest";
import app from "../../server";
import orderModel from "../../models/order.model";
import userModel from "../../models/user.model";
import Order from "../../types/order.type";
import User from "../../types/user.type";
import db from "../../database/database";

const userM = new userModel();
const orderM = new orderModel();

const request = supertest(app);
let token = "";

describe("Testing Logic", () => {
	const user = {
		username: "testname",
		firstname: "firsttest",
		lastname: "lasttest",
		password: "testpassword",
	} as User;

	const order = {} as Order;

	beforeAll(async () => {
		const createdUser = await userM.create(user);

		user.id = createdUser.id;
		order.user_id = createdUser.id as unknown as number;
		const createdOrder = await orderM.create(order.user_id);
	});

	afterAll(async () => {
		const conn = await db.connect();
		const sql2 = "DELETE FROM orders;";
		await conn.query(sql2);
		const sql1 = "DELETE FROM users;";
		await conn.query(sql1);

		conn.release();
	});
	it("Order Create Endpoint", async () => {
		const res = await request
			.post("/api/orders")
			.set("content-type", "application/json")
			.send({ user_id: order.user_id });
		expect(res.status).toBe(200);

		const id = res.body.id;
		const user_id = res.body.user_id;

		expect(id).toEqual(order.id);
		expect(user_id).toEqual(order.user_id);
	});

	it("Order Show Endpoint", async () => {
		const res = await request
			.get(`/api/orders/${order.id}`)
			.set("content-type", "application/json");
		expect(res.status).toBe(200);

		const id = res.body.id;
		const user_id = res.body.user_id;

		expect(id).toBe(order.id);
		expect(user_id).toBe(order.user_id);
	});

	it("order Index Endpoint", async () => {
		const res = await request
			.get("/api/orders")
			.set("content-type", "application/json");
		expect(res.status).toBe(200);
		const allOrders = res.body;
		expect(allOrders.length).toEqual(2);
	});
});
