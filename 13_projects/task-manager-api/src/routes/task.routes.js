import express from "express"
import { createTask, deleteTask, getSingleTask, getTasks, replaceTask, updateTask } from "../controllers/task.controllers.js"

const router = express.Router();

router.post("/", createTask)
router.get("/", getTasks)
router.get("/:id", getSingleTask)
router.patch("/:id", updateTask)
router.put("/:id", replaceTask)
router.delete("/:id", deleteTask)


export default router;