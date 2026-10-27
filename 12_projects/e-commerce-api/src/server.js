import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT_NO;
const HOST = process.env.HOST_NAME;

connectDb();

app.listen(PORT, HOST, () => {
    console.log("server is listening!")
})