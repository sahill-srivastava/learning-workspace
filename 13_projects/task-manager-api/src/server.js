import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT_NO;
const HOST = process.env.HOSTNAME;

connectDb();

app.listen(PORT, HOST, () => {
    console.log(`server is listening on http://${HOST}:${PORT}`)
})
