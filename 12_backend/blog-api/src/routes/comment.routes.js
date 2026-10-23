import express from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controllers/comment.controllers.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/posts/:postId/comments", userAuth, createComment)
router.get("/posts/:postId/comments",  getComments)
router.patch("/comments/:commentId", userAuth, updateComment)
router.delete("/comments/:commentId", userAuth, deleteComment)

export default router;