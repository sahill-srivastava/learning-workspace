import express from "express";
import { getProfile, logIn, logOut, signUp } from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout", userAuth, logOut)
router.get("/profile", userAuth, getProfile)

export default router;