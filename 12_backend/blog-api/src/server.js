import app from "./app.js";

const PORT = process.env.PORT_NO;
const HOST = process.env.HOST_NAME;


app.listen(PORT, HOST, () => {
    console.log(`server is connected on http://localhost:3000`)
})