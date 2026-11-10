import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import categorySchema, { categoryUpdateSchema } from "../validators/categoryValidator.js";

const router = express.Router();

router.post("/", userAuth, adminAuth, validate(categorySchema), createCategory)
router.get("/", getAllCategories)
router.get("/:id", getCategory)
router.patch("/:id", userAuth, adminAuth, validate(categoryUpdateSchema), updateCategory)
router.delete("/:id", userAuth, adminAuth, deleteCategory)


export default router;