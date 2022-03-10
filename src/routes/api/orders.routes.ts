import { Router, Request, Response } from "express";

import authenticateMiddleware from "../../middleware/authentication.middleware";
import * as controller from "../../controllers/orders.controllers";

const routes = Router();
routes.route("/").get(controller.index).post(controller.create);
routes.get("/:id", controller.show);
routes.get("/user/:user_id", controller.userOrders);
routes.post("/product", controller.addProduct);
routes.delete("/:id", controller.deleteOrder);

export default routes;
