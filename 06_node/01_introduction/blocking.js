const crypto = require("crypto");

console.log("Hello World");


var a = 1078698;
var b = 20986;

//No callback, it will block main thread - don't use it
//Sync Function
crypto.pbkdf2Sync("password123", "salt", 5000000, 50, "sha512")
console.log("first key is generted");

//Password Base Key Derivation Function
//Async Function
crypto.pbkdf2("password123", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("key is generated");
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
first key is generted
Multiplication result is :  22637556228
key is generated

*/