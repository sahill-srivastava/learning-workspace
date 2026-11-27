import express from "express"
import userAuth from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { cancelOrder, createOrderByBuyNow, createOrderByCart, getAllOrders, getCustomerOrders, getCustomerSingleOrder, getSingleOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import orderSchema from "../validators/ordersValidator.js";

const router = express.Router();

//User routes
router.post("/", userAuth, validate(orderSchema), createOrderByCart)
router.post("/buy-now", userAuth, createOrderByBuyNow)
router.get("/my-orders", userAuth, getAllOrders)
router.get("/:orderId", userAuth, getSingleOrder)
router.patch("/:orderId/cancel", userAuth, cancelOrder)


//Admin routes
router.get("/admin", userAuth, adminAuth, getCustomerOrders)
router.get("/admin/:orderId", userAuth, adminAuth, getCustomerSingleOrder)
router.patch("/admin/:orderId/status", userAuth, adminAuth, updateOrderStatus)


export default router;