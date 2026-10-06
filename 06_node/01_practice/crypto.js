import crypto from "node:crypto";


const hash = crypto.createHash("sha256");

hash.update("Hello World");
const result = hash.digest("hex")

console.log(result)