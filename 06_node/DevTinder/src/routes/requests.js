const express = require("express");
const { userAuth } = require("../middlewares/auth");


const requestRouter = express.Router();

requestRouter.post("/send", userAuth, async (req, res) => {
    console.log("sending request")
    const user = req.user;

    console.log(user)


    res.send(user.firstName + "sent the connect request")
})


module.exports = requestRouter;