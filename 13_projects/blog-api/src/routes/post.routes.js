import express from "express"
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from "../controllers/posts.controllers.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", userAuth, createPost)
router.get("/", getPosts)
router.get("/:id", getSinglePost)
router.patch("/:id", userAuth, updatePost)
router.delete("/:id", userAuth, deletePost)

export default router;