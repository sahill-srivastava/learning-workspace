import mongoose from "mongoose";
import Post from "../models/Post.js";

//create post
export const createPost = async (req, res) => {
    try {
        const { _id } = req.user;
        const { title, content } = req.body;

        //validation
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title must be a non-empty string"
            });
        }

        if (typeof content !== "string" || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Content must be a non-empty string"
            });
        }


        const post = await Post.create({ title, content, author: _id });

        res.status(201).json({
            success: true,
            message: "Blog is created",
            data: post
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//get all post
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});

        if (!posts) {
            return res.status(404).json({
                "success": true,
                "message": "Posts retrieved successfully",
                "data": []
            })
        }

        res.status(200).json({
            success: true,
            message: "Blog found successfully",
            data: posts
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//get single post
export const getSinglePost = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Blog found successfully",
            data: post
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//update post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        const updates = {};

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Title must be a non-empty string"
                });
            }

            updates.title = title.trim();
        }

        if (content !== undefined) {
            if (typeof content !== "string" || !content.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Content must be a non-empty string"
                });
            }

            updates.content = content.trim();
        }


        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide a title or content to update"
            });
        }

        const post = await Post.findOneAndUpdate({_id: id, author: req.user._id}, updates, { returnDocument: "after", runValidators: true })

        if(!post) {
             return res.status(404).json({
                success: false,
                message: "Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated",
            data: post
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//delete post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        const post = await Post.findOneAndDelete({_id: id, author: req.user._id});

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog is deleted"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

