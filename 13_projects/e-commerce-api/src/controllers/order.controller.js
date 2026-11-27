import { success } from "zod";
import Cart from "../models/Cart.js";
import Products from "../models/Products.js";

//create order
export const createOrderByCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // console.log(userId)

        const cartItem = await Cart.findOne({ user: userId })

        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: "Cart is empty"
            })
        }

        // console.log(cartItem)

        const items = cartItem.items;

        if (!items || items.length === 0) {
            res.status(404).json({
                success: false,
                message: "Cart is empty"
            })
        }

        let subtotal = 0;

        const productItems = await Promise.all(
            items.map(async (i) => {
                // console.log(i)

                const productId = i.product;
                const quantity = i.quantity;

                const product = await Products.findById(productId)

                // console.log("prod :", product)
                const { _id, name, price, images } = product;

                console.log("price: ", price)

                subtotal += price;

                return {
                    product: _id,
                    name,
                    price,
                    images,
                    quantity
                };
            })
        )

        console.log("productItems: ", productItems)

        console.log(req.body)

        console.log("subtotal: ", subtotal)

        res.status(201).json({
            success: true,
            message: "Hii"
        })

    } catch (err) {
        next(err)
    }
}

//create order
export const createOrderByBuyNow = async (req, res, next) => {
    try {


        res.status(201).json({
            success: true,
            message: "Hii2"
        })

    } catch (err) {
        next(err)
    }
}

//get all orders
export const getAllOrders = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//get one order
export const getSingleOrder = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//cancel order
export const cancelOrder = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//admin - get customers orders
export const getCustomerOrders = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//admin - get single customers order
export const getCustomerSingleOrder = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

//admin - update order status
export const updateOrderStatus = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}