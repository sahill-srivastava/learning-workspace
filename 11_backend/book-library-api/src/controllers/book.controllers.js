import mongoose from "mongoose";
import Book from "../models/book.model.js"

//create book
export const createBook = async (req, res) => {
    try {

        //save to db
        const book = await Book.create(req.body);

        res.status(201).json({
            message: "Book is added to library",
            data: book
        })
    } catch (err) {
        console.log(err)

        if (err.name === "ValidationError" || err.name === "CastError") {
            res.status(400).json({
                message: "Invalid Book Data",
                error: err.message
            })
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })

    }
}

//get books
export const getBooks = async (req, res) => {
    try {

        //extract books from db
        const books = await Book.find();

        if (!books) {
            res.status(404).json({
                message: "Books Not Found"
            })
        }

        res.status(200).json({
            message: "Books found successfully",
            data: books
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

//get single book
export const getSingleBook = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }

        //search db
        const book = await Book.findById(_id);


        if (!book) {
            return res.status(400).json({
                message: "Book not found"
            })
        }

        res.status(200).json({
            message: "Book found successfully",
            data: book
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

//update book
export const updateBook = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }

        const book = await Book.findByIdAndUpdate({ _id }, req.body, { returnDocument: "after", runValidators: true });

        if (!book) {
            return res.status(400).json({
                message: "Book not found"
            })
        }

        res.status(200).json({
            message: "Book has been updated",
            data: book
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

//replace Book
export const replaceBook = async (req, res) => {
    try {

        const { id: _id } = req.params;

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }

        const book = await Book.findOneAndReplace({ _id }, req.body, { returnDocument: "after", runValidators: true });

        if (!book) {
            return res.status(400).json({
                message: "Book not found"
            })
        }



        res.status(200).json({
            message: "Book has been replaced",
            data: book
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

//delete Book
export const deleteBook = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.isObjectIdOrHexString(_id)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }

        const book = await Book.findByIdAndDelete(_id)

        res.status(200).json({
            message: "Book has been deleted",
            data: book
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}