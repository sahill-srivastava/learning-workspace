import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { addToCart, clearCart, getUserCart, removeProductFromCart, updateProductQuantity } from "../controllers/carts.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { cartSchema } from "../validators/cartValidator.js";

const router = express.Router();

router.post("/", userAuth, validate(cartSchema), addToCart)
router.get("/", userAuth, getUserCart)
router.patch("/:productId", userAuth, updateProductQuantity)
router.delete("/:productId", userAuth, removeProductFromCart)
router.delete("/", userAuth, clearCart)

export default router;  