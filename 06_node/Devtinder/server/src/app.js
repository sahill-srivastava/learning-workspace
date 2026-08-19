const express = require("express")
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");


//Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) //Always on top
app.use(express.json())
app.use(cookieParser());


//Routes
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)


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