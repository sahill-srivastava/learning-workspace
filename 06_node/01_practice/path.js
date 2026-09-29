import path from "node:path";

//path.parse()
const filePath = "/projects/src/utils/constants.js"

const result = path.parse(filePath)


//path.format()
const filePath = path.format({
    dir: path.join("projects", "src", "models"),
    name: "users",
    ext: ".js"
})


//path.isAbsolute()
const filePath = "projects/src/utils/constants.js"
console.log(path.isAbsolute(filePath))