const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photUrl age gender about skills";

// Get all the pending connection requuest for the logginIn user
userRouter.get("/user/requests", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        res.json({ message: "Data fetched successfully", data: connectionRequest })

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})


userRouter.get("/user/connections", userAuth, async (req, res) => {

    try {

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }

            return row.fromUserId;
        })

        res.json({ data })


    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
module.exports = userRouter