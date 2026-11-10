import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    publicId: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Images = mongoose.model("Images", imageSchema);

export default Images;