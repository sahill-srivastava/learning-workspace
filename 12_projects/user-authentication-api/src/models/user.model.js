import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Please provide a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [72, "Password cannot exceed 72 bytes"]
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;