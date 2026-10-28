import User from "../models/User.js"
import validator from "validator"

//get profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User found successfully",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// updateProfile
export const updateProfile = async (req, res, next) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input"
            })
        }

        const updates = {};

        const allowedFields = ["name", "email", "address"]

        for (let [key, val] of Object.entries(req.body)) {

            if (!allowedFields.includes(key)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input"
                })
            }

            switch (key) {
                case "name":
                    //name
                    if (typeof val !== "string" || !val.trim()) {
                        throw new Error("Name is required")
                    }

                    updates.name = val.trim();
                    break;

                case "email":

                    //check duplicate email
                    const existingUser = await User.findOne({ email: val })

                    if (existingUser) {
                        return res.status(400).json({
                            success: false,
                            message: "Email already exists"
                        })
                    }

                    //email
                    if (!validator.isEmail(val)) {
                        throw new Error("Invalid email")
                    }

                    updates.email = val.trim();
                    break;

                case "address":
                    //address
                    if (typeof val !== "string" || !val.trim()) {
                        throw new Error("Address is required")
                    }

                    updates.address = val.trim();
                    break;
            }



        }

        const existingUser = await User.findById(req.user._id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        console.log("updates : ", updates)

        const user = await User.findByIdAndUpdate({ _id: req.user._id }, updates, { returnDocument: "after", runValidators: true })

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// deleteProfile
export const deleteProfile = async (req, res, next) => {
    try {

        const user = await User.findByIdAndDelete({ _id: req.user._id })

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        })
    } catch (err) {
        next(err)
    }
}

// updatePassword
export const updatePassword = async (req, res, next) => {
    try {


        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })
    } catch (err) {
        next(err)
    }
}