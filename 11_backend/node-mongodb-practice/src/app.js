import http from "node:http";
import { connectDatabase } from "./config/dbConfig.js";
import { users } from "./models/users.js";

const server = http.createServer(async (req, res) => {
    try {


        //client will send one entry, and i will store that entry in db

        if (req.method === "POST" && req.url === "/users") {

            //receiving body
            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            })

            req.on("end", async (chunk) => {
                console.log("body1: ", body);

                const user = JSON.parse(body);

                console.log(user)

                await users.insertOne(user);

                res.end("User added successfully")
            })


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