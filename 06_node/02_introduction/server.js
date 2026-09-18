const http = require("http");

const server = http.createServer((req, res) => {

    //reply them with hello world

    res.end("Hello World");
});


server.listen(7777)