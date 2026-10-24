import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validateLogIn, validateSignUp } from "../utils.js"
import User from "../models/User.js"

//signup
export const signUp = async (req, res) => {
    try {

        //validate 
        const { name, email, password } = validateSignUp(req.body)

        //check email is present
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("User is already registered")
        }

        //hash password
        const hashPassword = await bcrypt.hash(password, 10)


        //save in db
        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).json({
            message: "Signup Successful",
            data: user
        })

    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//logIn
export const logIn = async (req, res) => {
    try {

        //validate
        const { email, password } = validateLogIn(req.body)

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error("Invalid email or password")
        }

        //compare pass
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            throw new Error("Invalid email or password")
        }

        //create jwt token
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(200).json({
            message: "Login Successful"
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//logOut
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "Logout successful"
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}

//getProfile
export const getProfile = async (req, res) => {
    try {
        const { _id } = req.user;

        if (!_id) {
            throw new Error("User not found")
        }

        const user = await User.findById(_id);


        res.status(200).json({
            message: "User Found Successfully",
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}