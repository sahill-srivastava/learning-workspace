const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData } = require("./utils/validation")

//converts js object into json
app.use(express.json())

app.post("/test", (req, res) => {
    console.log("TEST HIT");
    res.send("Working");
});


// POST request example - Create Data in db
app.post("/signup", async (req, res) => {

    try {

        //validation of data
        validateSignUpData(req)

        //encrypt pass

        const userObj = req.body;

        //creating the new instance of the User model
        const user = new User(userObj);

        await user.save();

        res.send("user add successfully")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


//GET request example - get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {

        const user = await User.find({ emailId: userEmail });

        res.send(user)

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

//GET example2 - get all the users from the db
app.get("/feed", async (req, res) => {

    try {

        const users = await User.find({});

        res.send(users)

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// DELETE example - delete one user from db
app.delete("/user", async (req, res) => {

    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId)

        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send("Something went wrong")
    }

})

// PATCH example - 
app.patch("/user", async (req, res) => {

    const userId = req.body.userId;
    const updatedData = {
        emailId: req.body.emailId
    };

    try {
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            returnDocument: "after",
            runValidators: true,
        })

        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Errorr: " + err.message)
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





