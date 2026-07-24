const express = require("express")


const app = express();


app.use("/user", (req, res, next) => {

    
    // res.send("hello world1")
    next();
}, (req, res) => {
     res.send("hello world2")
})



app.listen(3000, () => {
    console.log("Server is succesfully listening on port 3000...");
});

