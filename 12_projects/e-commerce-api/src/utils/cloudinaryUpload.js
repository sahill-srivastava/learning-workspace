import cloudinary from "../config/cloudinary.js";


export const uploadToCloudinary = (buffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            { folder: process.env.CLOUDINARY_FOLDER_NAME },
            (error, result) => {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result)
                }
            }
        )


        stream.end(buffer);
    })
}