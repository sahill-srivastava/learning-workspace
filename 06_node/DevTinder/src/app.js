const express = require("express")
const connectDB = require("./config/database")
const app = express();


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





