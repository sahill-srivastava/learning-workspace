import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { validateLogIn, validateSignUp } from "../utils.js";

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

        const { email, password: pass } = validateLogIn(req.body)

        //check email present in db
        const userExists = await User.findOne({ email });

        if (!userExists) {
            throw new Error("Invalid Email")
        }

        //compare password using bcrypt
        const { _id, password: hash } = userExists;
        const isEmailPresent = await bcrypt.compare(pass, hash)


        if (!isEmailPresent) {
            throw new Error("Invalid email or password")
        }

        //create jwt token
        const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        res.cookie("token", token)

        res.status(200).json({
            message: "Login successful",
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message,
        })
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

//profile
export const getProfile = async (req, res) => {
    try {

        const { _id } = req.user;
        const user = await User.findOne({ _id })

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
        }

        res.status(200).json({
            message: "User found successfully",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message,
        })
    }
}