import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { patchProductSchema, productSchema } from "../validators/productValidator.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", userAuth, adminAuth, upload.array("images", 5), validate(productSchema), createProduct)
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.patch("/:id", userAuth, adminAuth, upload.array("images", 5), validate(patchProductSchema), updateProduct)
router.delete("/:id", userAuth, adminAuth, deleteProduct)


export default router;