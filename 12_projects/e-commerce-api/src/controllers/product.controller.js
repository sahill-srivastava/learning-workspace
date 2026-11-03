import mongoose from "mongoose"
import Category from "../models/Categories.js"
import Images from "../models/Image.js"
import Products from "../models/Products.js"
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js"
import cloudinary from "../config/cloudinary.js"

//createProduct
export const createProduct = async (req, res, next) => {
    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product images are required"
            })
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const { name, description, price, category, stock, isActive } = req.body;

        //Extract category id from db
        const existingCategory = await Category.findOne({ name: category });

        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            })
        }

        // uploadToCloudinary
        const uploadedImages = await Promise.all(

            req.files.map(async (file) => {

                const result = await uploadToCloudinary(file.buffer)

                return {
                    originalName: file.originalname,
                    publicId: result.public_id,
                    url: result.secure_url,
                    size: result.bytes
                };

            })
        )

        //Save images in db and extract ids
        const images = await Images.create(uploadedImages)
        const imageIds = images.map(image => image._id)

        const product = await Products.create({
            name,
            description,
            price,
            images: imageIds,
            category: existingCategory._id,
            stock,
            isActive
        })

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

//getAllProducts
export const getAllProducts = async (req, res, next) => {
    try {

        const products = await Products.find({});

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "Products found successfully",
            data: products
        })
    } catch (err) {
        next(err)
    }
}

//getSingleProduct
export const getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "Product found successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

//updateProduct
export const updateProduct = async (req, res, next) => {
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
                message: "At least one field must be provided"
            })
        }

        const updates = { ...req.body };

        const existingProduct = await Products.findById(id).populate("images", "originalName publicId")

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }


        //update images
        if (req.files.length > 0) {

            // uploadToCloudinary
            const uploadedImages = await Promise.all(

                req.files.map(async (file) => {

                    const result = await uploadToCloudinary(file.buffer)

                    return {
                        originalName: file.originalname,
                        publicId: result.public_id,
                        url: result.secure_url,
                        size: result.bytes
                    };

                })
            )

            //Save images in db and extract ids
            const images = await Images.create(uploadedImages)
            const imageIds = images.map(image => image._id)
            updates.images = imageIds

            //delete old images
            await Promise.allSettled(
                existingProduct.images.map(async (image) => {
                    const { _id, publicId: public_id } = image;
                    await cloudinary.uploader.destroy(public_id)
                    await Images.findByIdAndDelete(_id)
                })
            )

        }

        //update category
        if (Object.hasOwn(req.body, "category")) {
            const { category } = req.body;

            const existingCategory = await Category.findOne({ name: category });

            if (!existingCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                })
            }

            const updatedCategory = existingCategory._id;
            updates.category = existingCategory._id;




        }

        const updatedProduct = await Products.findByIdAndUpdate(id, { $set: updates }, { returnDocument: "after", runValidators: true })

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })
    } catch (err) {
        next(err)
    }
}

//deleteProduct
export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }

        const existingProduct = await Products.findById(id).populate("images", "originalName publicId")

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const product = await Products.findByIdAndDelete(id)

        await Promise.allSettled(
            existingProduct.images.map(async (image) => {
                const { _id, publicId: public_id } = image;
                await cloudinary.uploader.destroy(public_id)
                await Images.findByIdAndDelete(_id)
            })
        )

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        })
    } catch (err) {
        next(err)
    }
}

