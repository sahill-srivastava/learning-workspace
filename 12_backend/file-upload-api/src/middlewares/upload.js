import multer from "multer";
import fs from "node:fs";

fs.mkdirSync("./uploads", { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage });

// const upload = multer({ dest: "./uploads"})

export default upload;