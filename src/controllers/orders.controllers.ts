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
		const newOrder = await order.create(req.body);

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
