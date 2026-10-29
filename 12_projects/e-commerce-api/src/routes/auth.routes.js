import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { userSchema } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", validate(userSchema), registerUser)
router.post("/login", loginUser)
router.post("/logout", userAuth, logoutUser)

export default router;