const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
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

//Get all the accepted/friend requests
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

            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }

            return row.fromUserId;
        })

        res.json({ data })


    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


userRouter.get("/feed", userAuth, async (req, res) => {


    try {

        /* User should see all the user cards except:
        - his own card
        - his connections card/friends
        - ignored people
        - already sent the connection request
        */

        const loggedInUser = req.user;

        /*
        /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
        /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
        /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
        /feed?page=4&limit=10 => 31-40 => .skip(30) & .limit(10)
        /feed?page=5&limit=10 => 41-50 => .skip(40) & .limit(10)
        */
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        //skip formula
        const skip = (page - 1) * limit;

        //find all connection requests (sent + received)
        const connectionRequest = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = new Set();

        connectionRequest.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [{ _id: { $nin: Array.from(hideUsersFromFeed) } }, { _id: { $ne: loggedInUser._id } }]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



module.exports = userRouter