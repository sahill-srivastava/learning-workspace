import mongoose from "mongoose";
import Files from "../models/Files.js";

//file upload
export const uploadFile = async (req, res, next) => {
    try {

        //validate file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            })
        }

        const { originalname, mimetype, path, filename, size } = req.file;

        //check whether it exists in db
        const existingFile = await Files.findOne({ filename });

        if (existingFile) {
            return res.status(400).json({
                success: false,
                message: "File already exists"
            })
        }

        //save to db
        const file = await Files.create({
            originalname,
            filename,
            path,
            mimetype,
            size
        })


        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            data: file
        })
    } catch (err) {
        next(err)
    }
}

//get all files
export const getFiles = async (req, res, next) => {
    try {

        const files = await Files.find({});

        if (files.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Files not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Files found successfully",
            data: files
        })
    } catch (err) {
        next(err)
    }
}

//get single files
export const getFileById = async (req, res, next) => {
    try {
        const fileId = req.params.id;

        if (!mongoose.isObjectIdOrHexString(fileId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const file = await Files.findById(fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "File found successfully",
            data: file
        })
    } catch (err) {
        next(err)
    }
}

//download file
export const downloadFileById = async (req, res, next) => {
    try {
        const fileId = req.params.id;

        if (!mongoose.isObjectIdOrHexString(fileId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const file = await Files.findById(fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            })
        }

        res.download(file.path, file.originalname)
    } catch (err) {
        next(err)
    }
}

//delete file
export const deleteFileById = async (req, res, next) => {
    try {

        const fileId = req.params.id;

        if (!mongoose.isObjectIdOrHexString(fileId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const file = await Files.findById(fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        await Files.findByIdAndDelete(fileId)

        res.status(200).json({
            success: true,
            message: "File deleted successfully",
            data: file
        })
    } catch (err) {
        next(err)
    }
}