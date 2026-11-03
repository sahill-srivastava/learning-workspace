import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { addToCart, clearCart, getUserCart, removeProductFromCart, updateProductQuantity } from "../controllers/carts.controller.js";

const router = express.Router();

router.post("/", userAuth, addToCart)
router.get("/", userAuth, getUserCart)
router.patch("/", userAuth, updateProductQuantity)
router.delete("/", userAuth, removeProductFromCart)
router.delete("/", userAuth, clearCart)

export default router;