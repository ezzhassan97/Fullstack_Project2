import db from "../database/database";
import Order from "../types/order.type";
import orderProduct from "../types/order.products.type";

class orderModel {
	// Create order function

	async create(user_id: number): Promise<Order> {
		try {
			const conn = await db.connect();
			const sql = "INSERT INTO orders (user_id) VALUES($1) RETURNING *";
			const result = await conn.query(sql, [user_id]);

			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(
				`Could not add new order for user ${user_id}. Error: ${err}`
			);
		}
	}

	// Index order function
	async index(): Promise<Order[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from orders";
			const result = await conn.query(sql);

			const orders = result.rows;
			conn.release();
			return orders;
		} catch (err) {
			throw new Error(`Could not show all orders. Error: ${err}`);
		}
	}
	// Show order function

	async show(id: number): Promise<Order> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from orders where id=($1)";
			const result = await conn.query(sql, [id]);

			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Could not show order with ID ${id}. Error: ${err}`);
		}
	}

	async userOrders(user_id: number): Promise<Order[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from orders where user_id=($1)";
			const result = await conn.query(sql, [user_id]);

			const orders = result.rows;
			conn.release();
			return orders;
		} catch (err) {
			throw new Error(
				`Could not show orders for user with ID ${user_id}. Error: ${err}`
			);
		}
	}
	async deleteOrder(id: number): Promise<Order> {
		try {
			const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
			// @ts-ignore
			const conn = await client.connect();

			const result = await conn.query(sql, [id]);

			const deletedOrder = result.rows[0];

			conn.release();

			return deletedOrder;
		} catch (err) {
			throw new Error(`Could not delete order ${id}. Error: ${err}`);
		}
	}

	async addProduct(op: orderProduct): Promise<Order> {
		// get order to see if it is open

		try {
			const sql =
				"INSERT INTO order_products (order_id, product_id,quantity) VALUES($1, $2, $3) RETURNING *";
			//@ts-ignore
			const conn = await Client.connect();

			const result = await conn.query(sql, [
				op.order_id,
				op.product_id,
				op.quantity,
			]);

			const order = result.rows[0];

			conn.release();

			return order;
		} catch (err) {
			throw new Error(
				`Could not add product  ${op.product_id} to order ${op.order_id}: ${err}`
			);
		}
	}
}

export default orderModel;
