import express from "express";
import loadEnv from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();



//Routes

export default app;