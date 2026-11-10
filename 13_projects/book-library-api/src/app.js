import express from "express"
import loadEnv from "./config/env.js";

const app = express();

//Middlewares
app.use(express.json())
loadEnv();


//Routes
import bookRouter from "./routes/book.routes.js";

app.use("/api/books", bookRouter)



export default app;