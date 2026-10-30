import Products from "../models/Products.js"

//createProduct
export const createProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        



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

