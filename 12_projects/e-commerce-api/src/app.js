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
import usersRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productsRouter from "./routes/product.routes.js";
import cartRouter from "./routes/carts.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/category", categoryRouter)
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use(errorHandler);

export default app;