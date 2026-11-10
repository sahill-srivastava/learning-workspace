import slugify from "slugify"
import Category from "../models/Categories.js";
import mongoose from "mongoose";

export const createCategory = async (req, res, next) => {
    try {
        const { name, isActive } = req.body;

        const slug = slugify(name, {
            lower: true,
            strict: true
        })

        //check category exists
        const existingCategory = await Category.findOne({ slug })

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            })
        }

        const category = await Category.create({
            name,
            slug,
            isActive
        })

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        })
    } catch (err) {
        next(err)
    }
}

export const getAllCategories = async (req, res, next) => {
    try {

        const categories = await Category.find({});

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Categories not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Categories found successfully",
            data: categories
        })
    } catch (err) {
        next(err)
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category found successfully",
            data: category
        })
    } catch (err) {
        next(err)
    }
}


export const updateCategory = async (req, res, next) => {
    try {

        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            })
        }

        const updates = {};

        if (Object.hasOwn(req.body, "name")) {
            const name = req.body.name;

            const slug = slugify(name, {
                lower: true,
                strict: true
            })

            updates.name = req.body.name;
            updates.slug = slug;

        }

        if (Object.hasOwn(req.body, "isActive")) {
            updates.isActive = req.body.isActive;
        }


        const update = await Category.findByIdAndUpdate(id, updates, { returnDocument: "after", runValidators: true });

        if (!update) {
            return res.status(400).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: update
        })
    } catch (err) {
        next(err)
    }
}


export const deleteCategory = async (req, res, next) => {
    try {

        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category
        })
    } catch (err) {
        next(err)
    }
}