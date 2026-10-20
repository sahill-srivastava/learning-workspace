import bcrypt from "bcrypt"
import { validateSignUp } from "../utils.js"

//signup
export const signUp = async (req, res) => {
    try {

        //validate 
        const {name, email, password} = validateSignUp(req.body)

        //check email is present
        const existingUser = await findOne({email});

        if(existingUser){
           throw new Error("User is already registered") 
        }

        //hash password
        const hashPassword = await bcrypt.sign(password, 10)

        console.log(hashPassword)
       

        res.status(201).json({
            message: "signup"
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

        res.status(200).json({
            message: "logIn"
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

        res.status(200).json({
            message: "logOut"
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

        res.status(200).json({
            message: "getProfile"
        })
    } catch (err) {
        res.status(500).json({
            error: err.name,
            message: err.message
        })
    }
}