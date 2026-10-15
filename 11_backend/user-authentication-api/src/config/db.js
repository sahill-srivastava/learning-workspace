import mongoose from "mongoose";

const connectDb = async () => {
    console.log("db connected")
    return await mongoose.connect(process.env.MONGO_URI)
}

export default connectDb;