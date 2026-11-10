import express from "express"
import { loadEnv } from "./config/env.js";


const app = express();

//Middlewares
app.use(express.json())
loadEnv();

//Routes
import filesRouter from "./routes/files.routes.js"
import errorHandler from "./middlewares/errorHandler.js";


app.use("/api/files", filesRouter);
app.use(errorHandler)

export default app;