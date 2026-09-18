import http from "node:http";


// console.log(http)

// http.createServer((req, res) => {
//     console.log("res: ", res)
// }).listen(3000, "127.0.0.1", () => {
//     console.log("server is listening")
// })

// or 

const server = http.createServer((req, res) => {
    res.end("nothing to show")
})

server.listen(3000, "127.0.0.1", () => {
    console.log("server is listening")
})

