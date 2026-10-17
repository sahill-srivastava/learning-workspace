import express from "express"
import { loadEnv } from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();


//Routes
import notesRouter from "./routes/notes.routes.js"

app.use("/api/notes", notesRouter)

export default app;