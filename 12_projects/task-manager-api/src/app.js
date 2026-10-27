import express from "express"
import { loadEnv } from "./config/env.js";

const app = express();


//Middlewares
app.use(express.json())
loadEnv();


//Routes
import taskRouter from "./routes/task.routes.js"

app.use("/api/tasks", taskRouter)

export default app;