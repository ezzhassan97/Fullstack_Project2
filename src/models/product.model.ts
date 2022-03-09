import db from "../database/database";
import Product from "../types/product.type";
import bcrypt from "bcrypt";
import config from "../middleware/config";

const hashPassword = (password: string) => {
	const pepper = config.pepper;
	const saltRounds = parseInt(config.saltRounds as string, 10);
	return bcrypt.hashSync(`${password}${pepper}`, saltRounds);
};

class productModel {
	// Create product function

	async create(p: Product): Promise<Product> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO products (product_name, price) VALUES($1,$2) RETURNING *";
			const result = await conn.query(sql, [p.product_name, p.price]);

			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(
				`Could not add new product ${p.product_name}. Error: ${err}`
			);
		}
	}

	// Index product function
	async index(): Promise<Product[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from products";
			const result = await conn.query(sql);

			const products = result.rows;
			conn.release();
			return products;
		} catch (err) {
			throw new Error(`Could not show all products. Error: ${err}`);
		}
	}
	// Show product function

	async show(id: number): Promise<Product> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * from products where id=($1)";
			const result = await conn.query(sql, [id]);

			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Could not show all products. Error: ${err}`);
		}
	}
}

export default productModel;
