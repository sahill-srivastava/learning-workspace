import express from "express";
import { logIn, logOut, signUP } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", signUP)
router.post("/login", logIn)
router.post("/logout", logOut)

export default router;