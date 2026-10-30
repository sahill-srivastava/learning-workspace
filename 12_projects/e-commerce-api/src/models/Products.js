import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: [200, "Description cannot exceed 200 characters"]
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "Stock must be a whole number"
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const Products = mongoose.model("Products", productSchema);


export default Products;