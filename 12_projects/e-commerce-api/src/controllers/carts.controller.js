import mongoose from "mongoose";
import Products from "../models/Products.js";
import Cart from "../models/Cart.js";

//add to cart
export const addToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!req.body || Object.keys(req.body) === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const { productId, quantity } = req.body;

        if (!mongoose.isObjectIdOrHexString(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }



        const product = await Products.findById(productId);

        if (!product || !product.isActive || product.stock === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not available"
            })
        }

        // console.log(product)
        //if product exist in cart
        const userCart = await Cart.findOne({
            user: userId,
            "items.product": productId
        })

        console.log(userCart)
        console.log(userCart.items)

        if (userCart) {

            await Cart.findOne({
                user: userId,
                "items.product": productId
            },
        {
            $set: {
                
            }
        })

        } else {
            console.log("this runs2");
            const item = await Cart.create({
                user: userId,
                items: [{
                    product: productId,
                    quantity
                }]
            })

            console.log(item)

        }


        res.status(201).json({
            success: true,
            message: "Cart created successfully",
        })

    } catch (err) {
        next(err)
    }
}

//getUserCart
export const getUserCart = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Cart found successfully",
        })

    } catch (err) {
        next(err)
    }
}

//updateProductQuantity
export const updateProductQuantity = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
        })

    } catch (err) {
        next(err)
    }
}

//removeProductFromCart
export const removeProductFromCart = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Cart removed successfully",
        })

    } catch (err) {
        next(err)
    }
}

//clearCart
export const clearCart = async (req, res, next) => {
    try {

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        })

    } catch (err) {
        next(err)
    }
}