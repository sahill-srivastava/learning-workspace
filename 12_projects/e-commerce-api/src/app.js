import express from "express"
import { loadEnv } from "./config/env.js";
import cookieParser from "cookie-parser";

const app = express();


//Middlewares
app.use(express.json())
loadEnv();
app.use(cookieParser())


//Routes
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

app.use("/api/auth", authRouter)
app.use(errorHandler);

export default app;