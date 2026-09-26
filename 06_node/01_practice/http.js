import http from "node:http"

const server = http.createServer((req, res) => {

    console.log(req.url)
    console.log(req.headers.host)

    const url = new URL(req.url, `http://${req.headers.host}`);

    console.log(url)

    const pathname = url.pathname;

    console.log(pathname)

    if (req.method === "GET" && pathname.startsWith("/users/")) {

        const userId = pathname.split("/")[2];

        console.log("User ID:", userId);

        res.end(`User ID: ${userId}`);

    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000);