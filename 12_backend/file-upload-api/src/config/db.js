import mongoose from "mongoose";

export const connectDb = async () => {
    console.log("db connected");
    return await mongoose.connect(process.env.MONGO_URI);
}