import express, { Request, Response } from "express";
import orderModel from "../models/order.model";

const order = new orderModel();

// Hello function for testing this order controller & Route

export const hello = async (_req: Request, res: Response) => {
	try {
		res.send("HELLO WORLD 🌎");
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

// CREATE NEW order FUNCTION for orderS TABLE
export const create = async (req: Request, res: Response) => {
	try {
		const newOrder = await order.create(req.body.user_id);

		res.json(newOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const index = async (_req: Request, res: Response) => {
	try {
		const allOrders = await order.index();
		res.json(allOrders);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};

export const show = async (req: Request, res: Response) => {
	try {
		const oneOrder = await order.show(req.params.id as unknown as number);
		res.json(oneOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
export const userOrders = async (req: Request, res: Response) => {
	try {
		const userOrder = await order.userOrders(
			req.params.user_id as unknown as number
		);
		res.json(userOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
export const deleteOrder = async (req: Request, res: Response) => {
	try {
		const deletedOrder = await order.deleteOrder(
			req.params.id as unknown as number
		);
		res.json(deletedOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
export const addProduct = async (req: Request, res: Response) => {
	try {
		const userOrder = await order.addProduct(req.body);
		res.json(userOrder);
	} catch (err) {
		res.status(400);
		res.json(err);
	}
};
