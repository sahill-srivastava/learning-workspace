import express from "express"
import { loadEnv } from "./utils.js";
import notesRouter from "./routes/notes.routes.js"

const app = express();




//Middlewares
app.use(express.json())
loadEnv();
app.use("/api/notes", notesRouter)







export default app;