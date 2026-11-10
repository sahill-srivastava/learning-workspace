import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Category name cannot exceed 100 characters"]
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;