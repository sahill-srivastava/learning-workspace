import Task from "../models/task.model.js"

//createTask
export const createTask = async (req, res) => {
    try {

        //receive body
        console.log(req.body)


        //save to db
        const user = await Task.create(req.body)


        //send response
        res.status(200).json({
            message: "Task added successfully",
            data: user,
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: err.message,
        })
    }
}

//get tasks
export const getTasks = (req, res) => {
    try {

        console.log("hii")

        res.send("hii")

    } catch (err) {
        console.log(err)
    }
}

//get single task
export const getSingleTask = (req, res) => {
    try {

        console.log("hii")

        res.send("hii")

    } catch (err) {
        console.log(err)
    }
}

//update task
export const updateTask = (req, res) => {
    try {

        console.log("hii")

        res.send("hii")

    } catch (err) {
        console.log(err)
    }
}

//replace task
export const replaceTask = (req, res) => {
    try {

        console.log("hii")

        res.send("hii")

    } catch (err) {
        console.log(err)
    }
}

//delete task
export const deleteTask = (req, res) => {
    try {

        console.log("hii")

        res.send("hii")

    } catch (err) {
        console.log(err)
    }
}