import express from "express"
import { deleteFileById, downloadFileById, getFileById, getFiles, uploadFile } from "../controllers/files.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", upload.single("myFile"), uploadFile)
router.get("/", getFiles)
router.get("/:id", getFileById)
router.get("/:id/download", downloadFileById)
router.delete("/:id", deleteFileById)

export default router;