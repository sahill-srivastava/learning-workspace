import express from "express";
import loadEnv from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();



//routes



export default app;