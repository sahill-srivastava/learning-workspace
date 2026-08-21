const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

//Get Profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {

        user = req.user;
        res.send(user)

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

//edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {


    try {
        if (!validateProfileEditData(req)) {
            return res.status(400).send("Invalid Edit Request");
        }

        const loggedInUser = req.user;

        console.log(loggedInUser)


        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        })


         await loggedInUser.save();

         res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
         })



    } catch (err) {
        res.status(404).send("ERROR : " + err.message)
    }


})


module.exports = profileRouter;