import http from "node:http";
import { connectDatabase } from "./config/dbConfig.js";
import { users } from "./models/users.js";

const server = http.createServer(async (req, res) => {
    try {



        if (req.method === "GET" && req.url === "/users") {

            let result = await users.updateMany({ role: "developer" }, {
                $set: {
                    verified: true
                }
            });


            res.setHeader("Content-Type", "application/json")


            const data = {
                message: "Data found successfully",
                users: result
            }
            res.end(JSON.stringify(data))

            return;

        } else {
            res.statusCode = 404;
            res.end("Page Not Found...")
        }



    } catch (err) {
        console.log(err)
    }
})


await connectDatabase();

server.listen(process.env.PORT_NO, process.env.HOST_NAME, () => {
    console.log(`server is listening on http://${process.env.HOST_NAME}:${process.env.PORT_NO}`)
})