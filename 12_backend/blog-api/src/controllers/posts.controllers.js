import Post from "../models/Post.js";
import User from "../models/User.js";

//create post
export const createPost = async (req, res) => {
    try {
        const { _id } = req.user;
        const { title, content } = req.body;

        //validation
        if (!title) {
            throw new Error("Title is required")
        }

        if (!content) {
            throw new Error("Content is required")
        }

        const post = await Post.create({ title, content, author: _id });

        res.status(201).json({ message: "post is created", data: post })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//get all post
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});

        if(!posts){
            throw new Error("Posts not found")
        }

        res.status(200).json({ message: "getPosts", data: posts })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//get single post
export const getSinglePost = async (req, res) => {
    try {



        res.status(200).json({ message: "getSinglePost" })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//update post
export const updatePost = async (req, res) => {
    try {



        res.status(200).json({ message: "post updated" })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {



        res.status(200).json({ message: "post deleted" })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

