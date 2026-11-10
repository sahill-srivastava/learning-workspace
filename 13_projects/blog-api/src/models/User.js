import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid Email"
        }
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;