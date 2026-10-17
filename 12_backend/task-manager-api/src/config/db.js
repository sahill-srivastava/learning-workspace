import mongoose from "mongoose"

export const connectDb = async () => {
    console.log("Db connected")
    return await mongoose.connect(process.env.MONGO_URI)
}