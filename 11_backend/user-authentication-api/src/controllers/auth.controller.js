import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { validateSignUp } from "../utils.js";

//signup
export const signUp = async (req, res) => {
    try {

        //Validate inputs
        const { name, email, password: pass } = validateSignUp(req.body)

        //check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
            })
        }

        //Hash Password
        const password = await bcrypt.hash(pass, 10)

        const user = await User.create({ name, email, password });

        res.status(201).json({
            message: "User added successfully",
            data: user
        })

    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message,
        })
    }
}

//logIn
export const logIn = async (req, res) => {
    try {

        res.send("logIn")
    } catch (err) {
        console.log(err)
    }
}

//logOut
export const logOut = async (req, res) => {
    try {

        res.send("logOut")
    } catch (err) {
        console.log(err)
    }
}