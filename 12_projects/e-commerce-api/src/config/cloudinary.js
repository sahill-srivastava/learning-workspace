import { v2 as cloudinary } from "cloudinary"

console.log("vv: ", process.env.CLOUDINARY_FOLDER_NAME)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;