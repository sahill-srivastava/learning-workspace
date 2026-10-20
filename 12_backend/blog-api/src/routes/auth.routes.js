import express from "express";
import { getProfile, logIn, logOut, signUp } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout", logOut)
router.post("/profile", getProfile)

export default router;