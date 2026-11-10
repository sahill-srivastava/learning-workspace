import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        min: 1,
        max: new Date().getFullYear(),
        validate: {
            validator: Number.isInteger,
            message: "Published year must be an integer"
        }
    },
    price: {
        type: Number,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
});


const Book = mongoose.model("Book", bookSchema);


export default Book;