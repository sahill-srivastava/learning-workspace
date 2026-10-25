import express from "express"
import { loadEnv } from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();

//Routes
import filesRouter from "./routes/files.routes.js"

app.use("/api/files", filesRouter);

export default app;