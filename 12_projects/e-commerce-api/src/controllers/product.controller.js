import Products from "../models/Products.js"
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js"

//createProduct
export const createProduct = async (req, res, next) => {
    try {
        // console.log(req.body)
        // console.log(req.files)

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product images are required"
            })
        }

        // uploadToCloudinary
        const uploadedImages = await Promise.all(

            req.files.map(async (file) => {

                const result = await uploadToCloudinary(file.buffer)

                // console.log("result: ", result)

                return {
                    url: result.secure_url,
                    public_id: result.public_id
                };

            })
        )

        console.log("uploadedImages: ", uploadedImages)




        res.status(201).json({
            success: true,
            message: "Product created successfully",
        })
    } catch (err) {
        next(err)
    }
}

//uploadImages
export const uploadImages = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Images uploaded successfully"
        })
    } catch (err) {
        next(err)
    }
}

//createCategory
export const createCategory = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Category created successfully"
        })
    } catch (err) {
        next(err)
    }
}

//getAllProducts
export const getAllProducts = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Products found successfully"
        })
    } catch (err) {
        next(err)
    }
}

//getSingleProduct
export const getSingleProduct = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Product found successfully"
        })
    } catch (err) {
        next(err)
    }
}

//updateProduct
export const updateProduct = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Product updated successfully"
        })
    } catch (err) {
        next(err)
    }
}

//deleteProduct
export const deleteProduct = async (req, res, next) => {
    try {



        res.status(201).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}

