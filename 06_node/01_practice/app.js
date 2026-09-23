// /promises is important for promised based api
import fs from "node:fs/promises";

console.log("1")

//promise based readfile operation
const fileReading = async () => {

    const data = await fs.readFile("data.txt", "utf-8")

    console.log(data)
}

fileReading();


console.log("2")