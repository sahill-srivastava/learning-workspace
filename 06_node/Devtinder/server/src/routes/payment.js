const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpay = require("../utils/razorpay")
const Payment = require("../models/order");
const { membershipAmount } = require("../utils/constants");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const User = require("../models/user");


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
        return res.status(500).json({ msg: err.message })
    }
})

// never use userAuth for razorpay webhook
paymentRouter.post("/payment/webhook", async (req, res) => {
    try {

        const webhookSignature = req.get("X-Razorpay-Signature");

        const isWebhookValid = validateWebhookSignature(
            JSON.stringify(req.body),
            webhookSignature,
            process.env.RAZORPAY_WEBHOOK_SECRET)

        if (!isWebhookValid) {
            return res.status(400).json({ msg: "webhook signature is invalid" })
        }

        //update my payment status in db
        const paymentDetails = req.body.payload.payment.entity;

        const payment = await Payment.findOne({ orderId: paymentDetails.order_id })
        payment.status = paymentDetails.status;
        await payment.save();

        const user = await User.findOne({ _id: payment.userId })
        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;

        await user.save();

        //update the user as premium


        //return success response to razorpay


        // 2 events
        // if (req.body.event === "payment.captured") {

        // }

        // if (req.body.event === "payment.failed") {

        // }

        return res.status(200).json({ msg: "Webhook received suceessfully" })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})


paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
    const user = req.user;

    if (user.isPremium) {
        return res.json({ isPremium: true });
    }

    return res.json({ isPremium: false });
})




module.exports = paymentRouter