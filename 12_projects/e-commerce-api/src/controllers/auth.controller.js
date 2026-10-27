import { validateUser } from "../utils.js"
import bcrypt from "bcrypt"

//register
export const registerUser = async (req, res, next) => {
    try {
        //validate
        validateUser(req.body)
        // const { name, email, password } = validateUser(req.body)

        //check user exists

        //create hash
        // const hash = await bcrypt.hash(password, 10);

        // console.log(hash)

        res.status(201).json({
            success: true,
            message: "User Created"
        })
    } catch (err) {
        next(err)
    }
}

//login
export const loginUser = async (req, res, next) => {
    try {


        res.status(201).json({
            success: true,
            message: "Login successful"
        })
    } catch (err) {
        next(err)
    }
}

//logout
export const logoutUser = async (req, res, next) => {
    try {


        res.status(201).json({
            success: true,
            message: "Logout successful"
        })
    } catch (err) {
        next(err)
    }
}