import fs from "node:fs/promises";


//access method
const accessMethod = async () => {
    try {

        //rename file
        await fs.access("data.txt");

        console.log("file is accessible")

    } catch (err) {
        console.log("file is inaccessible")
        console.log(err.message)
    }
}

accessMethod();







