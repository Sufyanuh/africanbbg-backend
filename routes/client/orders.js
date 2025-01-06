import { Router } from "express";
import { getOrders, OrderNow } from "../../controllers/client/orders.js";
import { Order } from "../../models/orders.js";
import { validateFields } from "../../middlewares/validateFields.js";

export const orderRouter = Router();

orderRouter.route("/").post(validateFields(Order), OrderNow).get(getOrders);
