import User from "../models/user.model.js";

//register
export const signUP = async (req, res) => {
    try {
        console.log(req.body)
        const {name, email, password } = req.body;

        //check required fields
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email, password are required"
            })
        }

        //check existing user
        const existingUser = await User.find({ email })

        res.send("signup")
    } catch (err) {
        console.log(err)
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