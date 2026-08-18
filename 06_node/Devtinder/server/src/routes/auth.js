const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const { hashPassword } = require("../utils/hashPassword")
const User = require("../models/user")
const validator = require("validator")

const authRouter = express.Router();

//Signup
authRouter.post("/signup", async (req, res) => {

    try {

        //validation of data
        validateSignUpData(req)

        //encrypt pass
        const passHash = await hashPassword(req);

        const {
            firstName,
            lastName,
            emailId,
            age,
            gender,
            photoUrl,
            about,
            skills

        } = req.body;

        //creating the new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passHash,
            age,
            gender,
            photoUrl,
            about,
            skills

        });

        await user.save();

        res.send("user add successfully")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


//Login
authRouter.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;


        if (!validator.isEmail(emailId)) {
            throw new Error("Email is not valid")
        }

        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("emailId is not present in db")
        }

        // const { password: hash } = user



        const isPasswordValid = await user.validatePassword(password)


        if (isPasswordValid) {

            //Create a jwt token

            const token = await user.getJWT()


            //Add the token to cookie and send the res back to user
            res.cookie("token", token)



            res.send(user)

        } else {
            throw new Error("Password is not correct");
        }

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }


})

//logout
authRouter.post("/logout", async (req, res) => {

    res.clearCookie("token").send("logout successfull");
})


module.exports = authRouter;