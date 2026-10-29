import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//register
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role, address } = req.body;

        //check user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        //create hash
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hash,
            role,
            address
        })

        res.status(201).json({
            success: true,
            message: "User successfully created",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

//login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const { _id, password: hash, role } = existingUser;

        const isPasswordValid = await bcrypt.compare(password, hash)

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        //create jwt token
        const token = jwt.sign({ _id, role }, process.env.JWT_SECRET);

        res.cookie("token", token);

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

        res.clearCookie("token")

        res.status(201).json({
            success: true,
            message: "Logout successful"
        })
    } catch (err) {
        next(err)
    }
}