import http from "node:http";
import { users } from "./dbConfig.js";


const server = http.createServer(async (req, res) => {
    try {

        const userList = [
            {
                firstName: "Sahil",
                lastName: "Srivastava",
                age: 24,
                role: "Developer"
            },
            {
                firstName: "Ananya",
                lastName: "Iyer",
                age: 28,
                role: "Designer"
            },
            {
                firstName: "Rohit",
                lastName: "Sharma",
                age: 32,
                role: "Manager"
            },
            {
                firstName: "Meera",
                lastName: "Nair",
                age: 26,
                role: "QA Engineer"
            },
            {
                firstName: "Kabir",
                lastName: "Joshi",
                age: 29,
                role: "DevOps Engineer"
            },
            {
                firstName: "Riya",
                lastName: "Kapoor",
                age: 23,
                role: "Data Analyst"
            }
        ];


        if (req.method === "POST" && req.url === "/users") {


            const result = await users.insertMany(userList)

            console.log(result)

            res.end("User add successfully")

            return;

        } else {
            res.statusCode = 404;

            res.end("Page Not Found")
        }


        // res.end("last")


    } catch (err) {
        console.log(err)
    }
})


server.listen(3000, "localhost", () => {
    console.log("server is listening")
})