import express from "express";
import loadEnv from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();


//Routes
import authRouter from "./routes/auth.routes.js";

app.use("/api/auth", authRouter)


export default app;