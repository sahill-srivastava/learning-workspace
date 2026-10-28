import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", userAuth, logoutUser)

export default router;