import orderModel from "../models/order.model";
import userModel from "../models/user.model";
import Order from "../types/order.type";
import User from "../types/user.type";
import db from "../database/database";

const userM = new userModel();
const orderM = new orderModel();

describe("Testing order Model Methods ", () => {
	describe("Testing Model Methods to Be defined", () => {
		it("order Create Method to be defined", () => {
			expect(orderM.create).toBeDefined();
		});
		it("order Index Method to be defined", () => {
			expect(orderM.index).toBeDefined();
		});
		it("order Show Method to be defined", () => {
			expect(orderM.show).toBeDefined();
		});
	});
});
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

	it("order show order for one user Method Function Test", async () => {
		const userOrder = await orderM.userOrders(order.user_id);
		expect(userOrder.length).toEqual(1);
	});

	it("order Index Method Function Test", async () => {
		const allOrders = await orderM.index();
		expect(allOrders.length).toBeGreaterThan(0);
	});

	it("order Show one Method Function Test", async () => {
		const oneOrder = await orderM.show(order.id as unknown as number);
		expect(oneOrder?.id).toBe(order.id);
	});
});
