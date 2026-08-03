const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")
const { hashPassword } = require("./utils/hashPassword")
const validator = require("validator")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth")

//converts js object into json
app.use(express.json())

app.use(cookieParser());


// POST - Sigup
app.post("/signup", async (req, res) => {

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

//POST Login
app.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("Email is not valid")
        }

        const user = await User.findOne({ emailId: emailId })

        const { password: hash } = user


        if (!user) {
            throw new Error("emailId is not present in db")
        }


        const isPasswordValid = await user.validatePassword(password)


        if (isPasswordValid) {

            //Create a jwt token

            const token = await user.getJWT()


            //Add the token to cookie and send the res back to user
            res.cookie("token", token)



            res.send("login successfull")

        } else {
            throw new Error("Password is not correct");
        }

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }


})

//Get Profile
app.get("/profile", userAuth, async (req, res) => {

    try {

        user = req.user;
        res.send(user)

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})



// Rule: Connect/Establish database connection first then start server/listening port requests
connectDB().then(() => {
    console.log("db connected")

    //listen port requests
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...");
    });

}).catch(err => {
    console.log("db not connected")
    console.log(err.message)
})





