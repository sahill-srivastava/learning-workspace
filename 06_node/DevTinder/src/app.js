const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")


app.post("/signup", async (req, res) => {

    const userObj = {
        firstName: "Sahil",
        lastName: "Srivastava",
        emailId: "sahil@gmail.com",
        password: "sahil@12345",
    }

    //creating the new instance of the User model
    const user = new User(userObj);

    await user.save();

    res.send("user add successfully")
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





