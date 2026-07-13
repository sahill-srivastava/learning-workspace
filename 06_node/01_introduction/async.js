const fs = require("fs");

const https = require("https");

console.log("Hello World");

var a = 10786898;
var b = 20986;



//api calls takes 100, 200 to 400ms to fetch
https.get("https://dummyjson.com/products/1", (res) => {
    console.log("Fetched Data Successfully");
});


// it takes long as you can see
setTimeout(() => {
    console.log("setTimeout called after 5 seconds");
}, 5000)


// it depends on file size, how long it takes time to execute.
//Async function
fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("File Data : ", data);
})

function multiplyFn(x, y) {
    const result = a * b;
    return result;
}

var c = multiplyFn(a, b);

console.log("Multiplication result is : ", c);


/*
Console Output:


Hello World
Multiplication result is :  226373841428
File Data :  This is the file data.
Fetched Data Successfully
setTimeout called after 5 seconds

*/