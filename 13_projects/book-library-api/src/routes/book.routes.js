import express from "express"
import { createBook, deleteBook, getBooks, getSingleBook, replaceBook, updateBook } from "../controllers/book.controllers.js";

const router = express.Router();

router.post("/", createBook)
router.get("/", getBooks)
router.get("/:id", getSingleBook)
router.patch("/:id", updateBook)
router.put("/:id", replaceBook)
router.delete("/:id", deleteBook)

export default router;