import mongoose from "mongoose"
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

        //validate id
        if (!mongoose.isObjectIdOrHexString(_id)) {
            console.log("this is not an object id")

            return res.status(404).json({
                message: "Invalid id"
            })
        }

        const task = await Task.findById({ _id })

        //validate task
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }

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

        //validate id
        if (!mongoose.isObjectIdOrHexString(_id)) {
            console.log("this is not an object id")

            return res.status(404).json({
                message: "Invalid id"
            })
        }

        //search db
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

         //validate task
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }


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
export const replaceTask = async (req, res) => {
    try {

        const { id: _id } = req.params;

        //validate id
        if (!mongoose.isObjectIdOrHexString(_id)) {
            console.log("this is not an object id")

            return res.status(404).json({
                message: "Invalid id"
            })
        }

        const task = await Task.findOneAndReplace({ _id }, req.body, { returnDocument: "after", runValidators: true });

         //validate task
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }


        res.status(200).json({

            message: "Task replaced successfully",
            data: task
        })

    } catch (err) {
        res.status(404).json({
            ErrorType: err.name,
            message: err.message
        })
    }
}

//delete task
export const deleteTask = async (req, res) => {
    try {

        const { id: _id } = req.params;

        //validate id
        if (!mongoose.isObjectIdOrHexString(_id)) {
            console.log("this is not an object id")

            return res.status(404).json({
                message: "Invalid id"
            })
        }

        const task = await Task.findByIdAndDelete(_id)

         //validate task
        if (!task) {
            return res.status(404).json({
                message: "task not found"
            })
        }


        res.status(200).json({
            message: "Task deleted successfully",
            data: task
        })

    } catch (err) {
        res.status(404).json({
            ErrorType: err.name,
            message: err.message
        })
    }
}