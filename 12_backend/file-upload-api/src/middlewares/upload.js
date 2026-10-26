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

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        console.log("filee : ", file)
        const allowedMimetype = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        if (allowedMimetype.includes(file.mimetype)) {
            return cb(null, true);

        } else {
            return cb(new Error("Only JPEG, PNG, WebP and PDF are allowed"))
        }
    }
});


export default upload;