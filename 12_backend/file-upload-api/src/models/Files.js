import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        required: true,
        trim: true,
    },
    mimetype: {
        type: String,
        required: true,
        enum: ["image/jpeg", "image/png", "image/webp", "application/pdf"]
    },
    size: {
        type: Number,
        required: true,
        min: 1,
        max: 5 * 1024 * 1024,
    },
    path: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Files = mongoose.model("Files", fileSchema);

export default Files;