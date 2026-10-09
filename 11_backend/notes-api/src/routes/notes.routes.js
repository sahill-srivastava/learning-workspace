import express from "express"
import { createNote, deleteNote, getNotes, getSingleNote, updateNote } from "../controllers/notes.controller.js";

const router = express.Router()

router.post("/", createNote)
router.get("/", getNotes)
router.get("/:id", getSingleNote)
router.patch("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router;