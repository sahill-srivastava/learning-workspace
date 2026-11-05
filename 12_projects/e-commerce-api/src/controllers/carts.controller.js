import mongoose from "mongoose";
import Products from "../models/Products.js";
import Cart from "../models/Cart.js";

//add to cart
export const addToCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const { productId, quantity } = req.body;

        let result;

        //check product is available
        const product = await Products.findById(productId);

        if (!product || !product.isActive || product.stock === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not available"
            })
        }

        //check product stock
        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Requested quantity exceeds available stock"
            })
        }

        //check whether user existing in cart collection
        const isUserExists = await Cart.findOne({ user: userId });

        if (isUserExists) {

            const isProductExistInItems = await Cart.findOne({
                user: userId,
                "items.product": productId
            })


            if (isProductExistInItems) {

                const targetProduct = isProductExistInItems.items.find(p => p.product.equals(productId));

                const limit = 100;

                if ((targetProduct.quantity + quantity) > limit) {
                    return res.status(400).json({
                        success: false,
                        message: "Product quantity cannot exceed 100"
                    })
                }

                const existingQuantity = targetProduct.quantity;

                const updatedQuantity = existingQuantity + quantity;

                //check updatequnatity in product stock
                if (updatedQuantity > product.stock) {
                    return res.status(400).json({
                        success: false,
                        message: "Requested quantity exceeds available stock"
                    });
                }

                result = await Cart.findOneAndUpdate({
                    user: userId,
                    "items.product": productId
                }, {
                    $set: {
                        "items.$.quantity": updatedQuantity
                    }
                }, {
                    returnDocument: "after",
                    runValidators: true
                })


            } else {

                result = await Cart.findOneAndUpdate({
                    user: userId,
                }, {
                    $push: {
                        items: {
                            product: productId,
                            quantity
                        }
                    }
                }, {
                    returnDocument: "after",
                    runValidators: true
                })

            }


        } else {

            result = await Cart.create({
                user: userId,
                items: [{
                    product: productId,
                    quantity
                }]
            })


        }

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            data: result
        })


    } catch (err) {
        next(err)
    }
}

//getUserCart
export const getUserCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product", "name price images stock")

        res.status(200).json({
            success: true,
            message: "Cart found successfully",
            data: cart ?? []
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