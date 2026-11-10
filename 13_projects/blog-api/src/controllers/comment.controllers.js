import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

//create comment of specific post
export const createComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const content = req.body.content;

        if (!mongoose.isObjectIdOrHexString(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        //check posts exists
        const post = await Post.findById(postId);

        if(!post){
             return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        if (!mongoose.isObjectIdOrHexString(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id"
            })
        }

        if (typeof content !== "string" || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Content cannot be empty or contain only spaces"
            });
        }

        const comment = await Comment.create({ post: postId, author: userId, content });

        res.status(201).json({
            success: true,
            message: "Comment created",
            data: comment
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//get comments of specific post
export const getComments = async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!mongoose.isObjectIdOrHexString(postId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            })
        }

        const comments = await Comment.find({ post: postId })

        res.status(200).json({
            success: true,
            message: "Comments found successfully",
            data: comments
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


//update specific comment 
export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const content = req.body.content;

        if (!mongoose.isObjectIdOrHexString(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment id"
            })
        }

        if (typeof content !== "string" || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Content cannot be empty or contain only spaces"
            });
        }

        const comment = await Comment.findOneAndUpdate({ _id: commentId, author: userId}, { content }, { returnDocument: "after", runValidators: true })

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Comments updated successfully",
            data: comment
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//delete specific comment
export const deleteComment = async (req, res) => {
    try {

        const commentId = req.params.commentId;
         const userId = req.user._id;

        if (!mongoose.isObjectIdOrHexString(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment id"
            })
        }

        const comment = await Comment.findOneAndDelete({_id: commentId, author: userId})

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Comments deleted successfully",
            data: comment
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}