import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    mimetype: {
        type: String,
        required: true,
        enum: ["image/jpeg", "image/png", "image/webp"]
    },
    size: {
        type: Number,
        required: true,
        min: 1,
        max: 5 * 1024 * 1024
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Images = mongoose.model("Images", imageSchema);

export default Images;