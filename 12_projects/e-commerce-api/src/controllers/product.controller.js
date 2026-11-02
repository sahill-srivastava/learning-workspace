import Category from "../models/Categories.js"
import Images from "../models/Image.js"
import Products from "../models/Products.js"
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js"

//createProduct
export const createProduct = async (req, res, next) => {
    try {

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

                return {
                    originalName: file.originalname,
                    publicId: result.public_id,
                    url: result.secure_url,
                    size: result.bytes
                };

            })
        )

        if (uploadedImages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product images are required"
            })
        }
        const images = await Images.create(uploadedImages)

        const imageIds = images.map(image => image._id) //imageIds

        // console.log("image id: ", imageIds) 

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const { name, description, price, category, stock, isActive } = req.body;

        console.log("cat: ", category)
        const existingCategory = await Category.findOne({ name: category });

        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            })
        }

        console.log("exist: ", existingCategory)



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

