// import fs from "node:fs"; 
import fs from "node:fs/promises";



//readFile method
const readContent = async () => {
    try {

        const data = await fs.readFile("data.txt", "utf-8");

        console.log(data)

    } catch (err) {
        console.log(err.message)
    }
}

readContent();


const data = {
    name: "Sahil",
    age: 24,
    phone: 86011430080,
    email: "sahil682002@gmail.com"
}

//writeFile method
const writeContent = async () => {
    try {


        await fs.writeFile("data.json", JSON.stringify(data));

        console.log("File updated successfully")

    } catch (err) {
        console.log(err.message)
    }
}

writeContent();

const appendData = {
    profile: "developer",
}

//appendFile method
const appendContent = async () => {
    try {

        const data = await fs.readFile("data.json", "utf-8")

        const user  = JSON.parse(data)

        
        Object.assign(user, appendData)        


        await fs.appendFile("data.json", JSON.stringify(user))

        console.log("Data append successfully")

    } catch (err) {
        console.log(err)
        console.log(err.message)
    }
}

appendContent();




//renameFile or move file method
const renameMethod = async () => {
    try {

        //rename file
        await fs.rename("data.txt", "user.txt");
        
        //movie file
        await fs.rename("user.txt", "backup/user.txt");

        console.log("file renamed successfully")

    } catch (err) {
        console.log(err.message)
    }
}

renameMethod();

//copyFile method
const copyMethod = async () => {
    try {

        await fs.copyFile("data.txt", "data-copy.txt");

        console.log("file copied successfully")

    } catch (err) {
        console.log(err.message)
    }
}

copyMethod();


//unlink method
const unlinkMethod = async () => {
    try {

        //rename file
        await fs.unlink("data.txt");

        console.log("file deleted successfully")

    } catch (err) {
        console.log(err.message)
    }
}

unlinkMethod();


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



//mkdir method
const makeDirectory = async () => {
    try {

        //rename file
        await fs.mkdir("./custom-folder/child1", {recursive: true});

        console.log("folder is created")

    } catch (err) {
        console.log(err.message)
    }
}

makeDirectory();

//readdir method
const readDirectory = async () => {
    try {

        const data = await fs.readdir("./custom-folder", { withFileTypes: true });

        console.log(data)

    } catch (err) {
        console.log(err.message)
    }
}

readDirectory();

//rmdir method
const removeDirectory = async () => {
    try {

        await fs.rmdir("./custom-folder", {recursive: true});

        console.log("folder is deleted")

    } catch (err) {
        console.log(err.message)
    }
}

removeDirectory();

//rm method
const removeFileDirectory = async () => {
    try {

        await fs.rm("./custom-folder", {recursive: true});

        console.log("file/folder is deleted")

    } catch (err) {
        console.log(err.message)
    }
}

removeFileDirectory();



//stat method
const getFileStats = async () => {
    try {

        const stats = await fs.stat("data.txt");

        console.log(stats)

    } catch (err) {
        console.log(err.message)
    }
}

getFileStats();

//stat method
const getFileLstats = async () => {
    try {

        const stats = await fs.lstat("data.txt");

        console.log(stats)

    } catch (err) {
        console.log(err.message)
    }
}

getFileLstats();



// createReadStream() Method
const readStream = fs.createReadStream("./data.txt", {
    encoding: "utf8",
    highWaterMark: 1024
});

readStream.on("data", (chunk) => {
    console.log("Received chunk:");
    console.log(chunk);
});

readStream.on("end", () => {
    console.log("Finished reading");
});

readStream.on("error", (error) => {
    console.error("Error:", error.message);
});


//createWriteStream Method
const writeStream = fs.createWriteStream("./data.txt");

writeStream.write("Hello Node.js\n");
writeStream.write("Learning Streams\n");
writeStream.write("This is chunk-based writing\n");

writeStream.end();

writeStream.on("finish", () => {
    console.log("File writing completed");
});

writeStream.on("error", (error) => {
    console.error("Error:", error.message);
});