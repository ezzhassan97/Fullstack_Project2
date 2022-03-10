import { Router, Request, Response } from "express";

import authenticateMiddleware from "../../middleware/authentication.middleware";
import * as controller from "../../controllers/products.controllers";

const routes = Router();
routes
	.route("/")
	.get(controller.index)
	.post(authenticateMiddleware, controller.create);
routes.get("/:id", controller.show);

routes.get("/hello", controller.hello);

export default routes;
