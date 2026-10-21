import express from "express";
import loadEnv from "./config/env.js";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(express.json())
app.use(cookieParser())
loadEnv();



//routes
import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)


export default app;