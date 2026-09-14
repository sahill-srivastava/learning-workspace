const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpay = require("../utils/razorpay")
const Payment = require("../models/order");
const { membershipAmount } = require("../utils/constants");


paymentRouter.post("/payment/create", userAuth, async (req, res) => {
    try {

        const { membershipType } = req.body;

        const { firstName, lastName, emailId } = req.user;
        const options = {
            amount: membershipAmount[membershipType] * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                firstName: "value1",
                lastName: "value2",
                membershipType: membershipType
            }
        }

        const order = await razorpay.orders.create(options)

        //Save it in my db
        const payment = new Payment({
            userId: req.user._id,
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            notes: order.notes,
        })

        const savedPayment = await payment.save();


        //return back my order to frontend
        res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID })

    } catch (err) {
        console.log(err)
    }
})




module.exports = paymentRouter