import express, { Request, Response } from "express";
import productModel from "../models/product.model";

const product = new productModel();

// Hello function for testing this product controller & Route

export const hello = async (_req: Request, res: Response) => {
	try {
		res.send("HELLO WORLD 🌎");
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CREATE NEW product FUNCTION for productS TABLE
export const create = async (req: Request, res: Response) => {
	try {
		const newProduct = await product.create(req.body);

		res.json(newProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const index = async (_req: Request, res: Response) => {
	try {
		const allProducts = await product.index();
		res.json(allProducts);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const show = async (req: Request, res: Response) => {
	try {
		const oneProduct = await product.show(req.params.id as unknown as number);
		res.json(oneProduct);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
