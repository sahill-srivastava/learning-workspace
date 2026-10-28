import express from "express"
import userAuth from "../middlewares/auth.middleware.js";
import { deleteProfile, getProfile, updatePassword, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", userAuth, getProfile)
router.patch("/me", userAuth, updateProfile)
router.delete("/me", userAuth, deleteProfile)
router.patch("/me/password", userAuth, updatePassword)

export default router;