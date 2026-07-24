const express = require("express")

const { adminAuth } = require("./middlewares/auth")

const app = express();



app.use("/admin", adminAuth)



app.listen(3000, () => {
    console.log("Server is succesfully listening on port 3000...");
});

