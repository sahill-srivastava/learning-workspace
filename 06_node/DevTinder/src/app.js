const express = require("express")


const app = express();


//GET call
app.get("/user", (req, res) => {
    res.send({firstName: "Sahil", lastName: "Srivastava"});
});

//POST call
app.post("/user", (req, res) => {
    res.send("Save data to db.");
});

//DELETE call
app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
});



app.listen(3000, () => {
    console.log("Server is succesfully listening on port 3000...");
});

