import { Router, Request, Response } from "express";

import authenticateMiddleware from "../../middleware/authentication.middleware";
import * as controller from "../../controllers/orders.controllers";

const routes = Router();
routes.route("/").get(controller.index).post(controller.create);
routes.get("/:id", controller.show);
routes.get("/user/:user_id", authenticateMiddleware, controller.userOrders);

export default routes;
