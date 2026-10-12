import Task from "../models/task.model.js"

//createTask
export const createTask = async (req, res) => {
    try {

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
            errorType: err.name,
            message: err.message,
        })
    }
}

//get tasks
export const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find();

        res.status(200).json({
            message: "Tasks found successfully",
            data: tasks
        })


    } catch (err) {
        console.log(err)
        res.status(404).json({
            errorType: err.name,
            message: err.message,
        })
    }
}

//get single task
export const getSingleTask = async (req, res) => {
    try {

        const { id: _id } = req.params;

        const task = await Task.findById({ _id })

        res.status(200).json({
            message: "Task Found successfully",
            data: task
        })

    } catch (err) {
        console.log(err)
        res.status(404).json({
            errorType: err.name,
            message: err.message,

        })
    }
}

//update task
export const updateTask = async (req, res) => {
    try {

        //receive 
        const { id: _id } = req.params;

        //search db
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        res.status(200).json({
            message: "Task updated successfully.",
            data: task
        })

    } catch (err) {
        res.status(404).json({
            errorType: err.name,
            message: err.message,
        })
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