import { success } from "zod";
import Cart from "../models/Cart.js";
import Products from "../models/Products.js";
import Order from "../models/Order.js";

//create order
export const createOrderByCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const cartItem = await Cart.findOne({ user: userId })

        if (!cartItem) {
            res.status(404).json({
                success: false,
                message: "Cart is empty"
            })
        }


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

                const productId = i.product;
                const quantity = i.quantity;

                const product = await Products.findById(productId)

                const { _id, name, price, images } = product;

                const image = images[0];

                subtotal += price;

                return {
                    product: _id,
                    name,
                    price,
                    image,
                    quantity
                };
            })
        )

        const { product, name, price, image, quantity } = productItems;

        if (!req.body) {
            res.status(404).json({
                success: false,
                message: "Invalid data"
            })
        }

        const { shippingAddress, paymentMethod } = req.body;


        const shippingCharge = subtotal >= 1000 ? 0 : 50;


        const tax = (12 * subtotal) / 100;


        const totalAmount = subtotal + shippingCharge + tax;


        let orderStatus = "pending";

        if (paymentMethod === "COD") {
            orderStatus = "confirmed"
        }

        //saving order 
        const order = await Order.create({
            user: userId,
            items: [...productItems],
            shippingAddress,
            subtotal,
            shippingCharge,
            totalAmount,
            tax,
            paymentMethod,
            paymentStatus: "pending",
            orderStatus
        })

        //update product stock
        productItems.map(async (p) => {
            const productId = p.product;
            const quantity = p.quantity;

            const existingProd = await Products.findById(productId)

            const updatedQuantity = existingProd.stock - quantity;

            await Products.findByIdAndUpdate(
                productId,
                {
                    $set: {
                        stock: updatedQuantity
                    }
                },
                { returnDocument: "after", runValidators: true }
            )

        })

        //clear cart
        await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: {
                    items: []
                }
            }

        )

        res.status(201).json({
            success: true,
            message: "Order successfully created",
            data: order
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