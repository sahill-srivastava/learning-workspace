const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

//converts js object into json
app.use(express.json())


app.post("/signup", async (req, res) => {

    const userObj = req.body;

    //creating the new instance of the User model
    const user = new User(userObj);

    await user.save();

    res.send("user add successfully")
})


//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    console.log(userEmail)

    try {

        const user = await User.find({ emailId: userEmail });

        res.send(user)

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

//feed api = get /feed - get all the users from the db
app.get("/feed", async (req, res) => {

    try {

        const users = await User.find({});

        res.send(users)

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Rule: Connect/Establish database connection first then start server/listening port requests
connectDB().then(() => {
    console.log("db connected")

    //listen port requests
    app.listen(3000, () => {
        console.log("Server is succesfully listening on port 3000...");
    });

}).catch(err => {
    console.log("db not connected")
    console.log(err.message)
})





