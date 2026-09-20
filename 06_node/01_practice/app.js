import http from 'node:http';

const server = http.createServer((req, res) => {
    try {
        
        res.writeHead(200, {
            "Content-Type": "text/plain",
            "x-powered-by": "bacon"
        })

        res.write("Hello")
        res.write(" World")
        res.end(", Sahil")

    } catch (err) {
        console.log(err)
    }
})


server.listen(3000, "localhost", () => {
    console.log("server is listening on http://localhost:3000/")
})