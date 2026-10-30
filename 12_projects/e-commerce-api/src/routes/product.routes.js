import express from "express";
import { createCategory, createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct, uploadImages } from "../controllers/product.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { productSchema } from "../validators/productValidator.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", userAuth, adminAuth, upload.array("images", 5), createProduct)
// router.post("/", userAuth, adminAuth, validate(productSchema), createProduct)
router.post("/images", userAuth, adminAuth, uploadImages)
router.post("/category", userAuth, adminAuth, createCategory)
router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.patch("/:id", userAuth, adminAuth, updateProduct)
router.delete("/:id", userAuth, adminAuth, deleteProduct)


export default router;