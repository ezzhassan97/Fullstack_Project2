import productModel from "../models/product.model";
import Product from "../types/product.type";
import db from "../database/database";

const productM = new productModel();

describe("Testing product Model Methods ", () => {
	describe("Testing Model Methods to Be defined", () => {
		it("product Create Method to be defined", () => {
			expect(productM.create).toBeDefined();
		});
		it("product Index Method to be defined", () => {
			expect(productM.index).toBeDefined();
		});
		it("product Show Method to be defined", () => {
			expect(productM.show).toBeDefined();
		});
	});

	describe("Testing Logic", () => {
		const product = {
			product_name: "testname",
			price: 100,
		} as Product;

		beforeAll(async () => {
			const createdproduct = await productM.create(product);
			product.id = createdproduct.id;
		});

		afterAll(async () => {
			const conn = await db.connect();
			const sql = "DELETE FROM products;";
			await conn.query(sql);
			conn.release();
		});

		it("product Create Method Function Test", async () => {
			const createdProduct = await productM.create({
				product_name: "testname2",
				price: 200,
			} as Product);

			expect(createdProduct).toEqual({
				id: createdProduct.id,
				product_name: "testname2",
				price: 200,
			} as Product);
		});

		it("product Index Method Function Test", async () => {
			const allProducts = await productM.index();
			expect(allProducts.length).toBeGreaterThan(1);
		});

		it("product Show Method Function Test", async () => {
			const oneProduct = await productM.show(product.id as unknown as number);
			expect(oneProduct?.product_name).toBe(product.product_name);
			expect(oneProduct?.price).toBe(product.price);
		});
	});
});
